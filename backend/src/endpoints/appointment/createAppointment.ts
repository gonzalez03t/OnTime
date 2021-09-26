import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { Reminder } from '../../entities/Reminder';
import { User, UserRole } from '../../entities/User';
import { getSessionUser } from '../../util/session';

// TODO: add logic for creating more than just a default reminder
/**
 * This function will attempt to create an appointment for the logged in user
 */
export default async function createAppointment(req: Request, res: Response) {
  const user = await getSessionUser(req);

  const { startsAt, employeeEmail, wantsReminder } = req.body;

  if (!startsAt || !employeeEmail) {
    res.status(400).send('You must specify an appointment time and employee.');
  } else {
    const employee = await em.findOne(User, {
      email: employeeEmail,
      role: UserRole.EMPLOYEE,
    });

    if (employee) {
      const appointment = em.create(Appointment, {
        client: user,
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
      res.status(400).send('Could not find the requested employee.');
    }
  }
}
