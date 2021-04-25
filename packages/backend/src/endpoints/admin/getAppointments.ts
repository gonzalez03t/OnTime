import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { redactAppointments } from '../../util/redacting';

// TODO: add body requests for date range

/**
 * This function will return all the appointments the logged in user (which is the admin/doctor)
 * has scheduled
 */
export default async function getAppointments(req: Request, res: Response) {
  const { userId } = req.session;

  await em
    .find(Appointment, { doctor: userId }, ['patient', 'reminders'])
    .then((appointments) => res.send(redactAppointments(appointments)))
    .catch((err) => res.status(500).send(err));
}
