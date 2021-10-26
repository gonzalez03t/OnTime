import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';

// TODO: check employeeId is valid
// TODO: make this a utility function, that gets called for each DAY in the dateRange.
// as opposed to getting pinged for each day change
export default async function getAvailableSlots(req: Request, res: Response) {
  const { employeeId, date } = req.body;

  if (!employeeId) {
    res.status(400).send('You must provide an employeeId');
  } else if (!date) {
    res.status(400).send('You must provide an date');
  } else {
    const duration = 60;

    // opening time
    let opening = new Date(date);
    opening.setHours(6, 30, 0);
    console.log('Opening Time:', opening.toString());

    let close = new Date(date);
    close.setHours(19, 30, 0);
    console.log('Closing Time:', close.toString());

    let appointments = await em.find(Appointment, {
      startsAt: { $gte: opening, $lte: close },
      status: { $eq: AppointmentStatus.PENDING },
      employee: employeeId,
    });

    appointments.sort((a, b) => (a.startsAt > b.startsAt ? 1 : -1));

    let start = new Date(opening);
    let end = new Date(opening);

    let index = 0;
    let availableSlots = [];

    while (start < close) {
      end.setHours(start.getHours(), start.getMinutes() + duration);

      if (index >= appointments.length) {
        // get hours left
        // add as many duration blocks we have left
        availableSlots.push({
          start: new Date(start),
          end: new Date(end),
        });

        start.setHours(start.getHours(), start.getMinutes() + duration);
      } else {
        const appointment = appointments[index];

        if (end < appointment.startsAt) {
          // there is a open slot
          // add to returning array
          availableSlots.push({
            start: new Date(start),
            end: new Date(end),
          });

          start.setHours(start.getHours(), start.getMinutes() + duration);
        } else {
          start = appointment.getEndTime();
          index++;
        }
      }
    }

    res.send(availableSlots);
  }
}
