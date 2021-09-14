import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';

/**
 * This function will return a list of all appointments scheduled at a given date range.
 * If no date range is provided, it will use the current month as the default.
 */
export default async function getFilledSlots(req: Request, res: Response) {
  const { dateRange } = req.body;

  let lower, upper;

  if (dateRange) {
    const { start, end } = dateRange;
    lower = start;
    upper = end;
  } else {
    lower = new Date();
    upper = new Date(lower.getFullYear(), lower.getMonth() + 1, 0); // up until last day of month
  }

  // opening.setHours(6, 30, 0, 0); // open @ 6:30AM
  // close.setHours(19, 30, 0, 0); // close/last appointment slot @ 7:30AM

  await em
    .find(Appointment, {
      startsAt: { $gte: lower, $lte: upper },
      status: { $eq: AppointmentStatus.PENDING },
    })
    .then((appointments) => res.send(appointments.map((a) => a.getDetails())))
    .catch((err) => res.status(500).send(err));
}
