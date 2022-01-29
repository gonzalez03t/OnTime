import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { Reminder } from '../../entities/Reminder';
import { User, UserRole } from '../../entities/User';
import { getSessionUser } from '../../util/session';

// TODO: refactor me to take in reminders the user selected
function createReminders(appointment: Appointment, wantsReminder: boolean) {
  if (wantsReminder) {
    appointment.reminders.add(
      em.create(Reminder, {
        remindAt: appointment.getDefaultReminderTime(),
      })
    );
  }
}

/**
 * This function will attempt to create an appointment for the logged in user
 */
export default async function createAppointment(req: Request, res: Response) {
  const user = await getSessionUser(req, ['company']);

  const { startsAt, employeeEmail, wantsReminder, companyId, clientId } =
    req.body;

  if (!startsAt || !employeeEmail || !companyId) {
    res
      .status(400)
      .send('You must specify an appointment time, company and employee.');
  } else if (!user) {
    res.sendStatus(401);
  } else if (employeeEmail === user.email && !clientId) {
    res.status(400).send('You must specify a client if you are the employee.');
  } else if (clientId) {
    // is the employee creating for the client
    // const client = await em.findOne(User, { id: clientId });
    const company = user.company;

    // sanity check, to ensure the user is an employee at the company
    if (company?.id === companyId && company?.hasEmployee(user)) {
      const appointment = em.create(Appointment, {
        client: clientId,
        company,
        employee: user,
        startsAt,
      });

      createReminders(appointment, wantsReminder);

      await em
        .persistAndFlush(appointment) // this will also flush/persist the reminder if added
        .then(() => res.status(201).send(appointment))
        .catch((err) => res.status(500).send(err));
    } else {
      // EMPLOYEE/USER NOT FOUND
      res.status(400).send('Could not find the requested employee.');
    }
  } else {
    // is the client creating for themselves

    // we need to load the employee to then load the company
    const employee = await em.findOne(User, {
      email: employeeEmail,
      role: UserRole.EMPLOYEE,
      company: companyId,
    });

    if (!employee || !employee.company) {
      // EMPLOYEE/USER NOT FOUND
      res.status(400).send('Could not find the requested employee.');
    } else {
      const appointment = em.create(Appointment, {
        client: user,
        company: employee.company,
        employee,
        startsAt,
      });

      createReminders(appointment, wantsReminder);

      await em
        .persistAndFlush(appointment) // this will also flush/persist the reminder if added
        .then(() => res.status(201).send(appointment))
        .catch((err) => res.status(500).send(err));
    }
  }
}
