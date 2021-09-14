import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';
import { getSessionUser } from '../../util/session';

/**
 * This function will attempt to reschedule an appointment for the logged in user
 */
export default async function rescheduleAppointment(
  req: Request,
  res: Response
) {
  const user = await getSessionUser(req);

  const { appointmentId, newDateTime } = req.body;

  if (!appointmentId || !newDateTime) {
    res
      .status(400)
      .send('You must specify an appointment and an updated date/time.');
  } else if (user) {
    const appt = await em.findOne(
      Appointment,
      {
        client: user,
        id: appointmentId,
        status: AppointmentStatus.PENDING,
      },
      ['reminders'] // load the reminders so it can be altered in reschedule
    );

    if (appt) {
      appt.reschedule(new Date(newDateTime));

      await em
        .persistAndFlush(appt)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send('No appointment could be found.');
    }
  } else {
    res.sendStatus(401);
  }
}
