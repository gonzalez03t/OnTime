import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { Reminder } from '../../entities/Reminder';
import { User, UserRole } from '../../entities/User';

/**
 * This function will attempt to create an appointment for the logged in user
 */
export default async function createAppointment(req: Request, res: Response) {
  // @ts-ignore: bug but promise it works
  const { userId } = req.session;
  const { startsAt, doctorEmail, wantsReminder } = req.body;

  if (!startsAt || !doctorEmail) {
    res.status(400).send('You must specify an appointment time and Doctor.');
  } else {
    const doctor = await em.findOne(User, {
      email: doctorEmail,
      role: UserRole.ADMIN,
    });

    if (doctor) {
      const appointment = em.create(Appointment, {
        patient: userId,
        doctor,
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
        .persistAndFlush(appointment)
        .then(() => res.status(201).send(appointment))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('Could not find the requested Doctor.');
    }
  }
}
