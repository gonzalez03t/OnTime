import { Request, Response } from 'express';
import { em } from '../..';
import { ReminderReturn } from '../../../@types/types';
import { Appointment } from '../../entities/Appointment';
import { redactReminders } from '../../util/redacting';

/**
 * This will return all of the reminders that belong to a given user
 */
export default async function getUserReminders(req: Request, res: Response) {
  // @ts-ignore: bug but promise it works
  const { userId } = req.session;

  await em
    .find(Appointment, { patient: userId }, [
      'doctor',
      'reminders',
      'reminders.appointment',
    ])
    .then((appointments) => {
      const reminders: ReminderReturn[] = [];
      // TODO: filter/remove some of the info from this return
      appointments.forEach((appointment) => {
        if (appointment.reminders.length) {
          reminders.push(...redactReminders(appointment.reminders.getItems()));
        }
      });
      res.send(reminders);
    })
    .catch((err) => res.status(500).send(err));
}
