import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';
import { User } from '../../entities/User';
import { getSessionUser } from '../../util/session';

type UserOrId = User | string;

async function fetchAppointment(client: UserOrId, id: string, employee?: User) {
  let where = {
    id,
    client,
    status: AppointmentStatus.PENDING,
  } as any;

  if (typeof client === 'string') {
    where.employee = employee;
  }

  return em.findOne(Appointment, where, ['reminders']);
}

/**
 * This function will attempt to cancel an appointment for the logged in user, or
 * the client specified by the clientId body parameter.
 */
export default async function cancelAppointment(req: Request, res: Response) {
  const user = await getSessionUser(req);

  const { clientId, appointmentId } = req.body;

  if (!appointmentId) {
    res.status(400).send('You must specify an appointment to cancel.');
  } else if (!user) {
    res.sendStatus(401);
  } else {
    // client is either the viewer, or loaded from body param
    let client = clientId ?? user;
    // employee can be the viewer, otherwise it will not be used
    let employee = clientId ? user : undefined;

    let appointment = await fetchAppointment(client, appointmentId, employee);

    if (appointment) {
      appointment.cancel();
      await em
        .persistAndFlush(appointment)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send('No appointment could be found.');
    }
  }
}
