import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { Company } from '../../entities/Company';
import { Reminder } from '../../entities/Reminder';
import { User, UserRole } from '../../entities/User';
import { getSessionUserOrFail } from '../../util/session';

/**
 * This function will attempt to create an appointment for the logged in user
 */
export default async function createAppointment(req: Request, res: Response) {
  const user = await getSessionUserOrFail(req);

  const { startsAt, employeeEmail, wantsReminder, companyId } = req.body;

  if (!startsAt || !employeeEmail || !companyId) {
    res
      .status(400)
      .send('You must specify an appointment time, company and employee.');
  } else {
    const employee = await em.findOne(User, {
      email: employeeEmail,
      role: UserRole.EMPLOYEE,
    });

    const company = await em.findOne(
      Company,
      {
        id: companyId,
      },
      ['employees', 'admins']
    );

    if (
      employee &&
      company &&
      (company.hasEmployee(employee) || company.hasAdmin(employee))
    ) {
      const appointment = em.create(Appointment, {
        client: user,
        company,
        employee,
        startsAt,
      });

      if (wantsReminder) {
        appointment.reminders.add(
          em.create(Reminder, {
            remindAt: appointment.getDefaultReminderTime(),
          })
        );
      }

      await em
        .persistAndFlush(appointment) // this will also flush/persist the reminder if added
        .then(() => res.status(201).send(appointment))
        .catch((err) => res.status(500).send(err));
    } else {
      // EMPLOYEE/USER NOT FOUND
      res.status(400).send('Could not find the requested employee.');
    }
  }
}
