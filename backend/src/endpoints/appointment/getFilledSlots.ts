import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';

/**
 * This function will return a list of all appointments scheduled at a given date.
 * If no date is provided, it will use the current date as the default.
 * // TODO: maybe change to a wider range? like a week? not sure
 */
export default async function getFilledSlots(req: Request, res: Response) {
  const { date } = req.body;

  let opening, close;

  if (date) {
    opening = new Date(date);
    close = new Date(date);
  } else {
    opening = new Date();
    close = new Date();
  }

  opening.setHours(6, 30, 0, 0); // open @ 6:30AM
  close.setHours(19, 30, 0, 0); // close/last appointment slot @ 7:30AM

  await em
    .find(Appointment, {
      startsAt: { $gte: opening, $lte: close },
      status: { $eq: AppointmentStatus.PENDING },
    })
    .then((appointments) => res.send(appointments.map((a) => a.getDetails())))
    .catch((err) => res.status(500).send(err));
}
