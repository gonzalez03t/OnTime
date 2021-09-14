import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { redactAppointments } from '../../util/redacting';
import { getSessionUser } from '../../util/session';

/**
 * This function will return all the appointments for the logged in user.
 */
export default async function getUserAppointments(req: Request, res: Response) {
  const user = await getSessionUser(req);

  await em
    .find(Appointment, { client: user }, ['employee', 'reminders'])
    .then((appointments) => res.send(redactAppointments(appointments)))
    .catch((err) => res.status(500).send(err));
}
