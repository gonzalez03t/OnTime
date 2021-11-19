import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';
import { User, UserRole } from '../../entities/User';
import parseTime from '../../util/parseTime';

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
    const employee = await em.findOne(
      User,
      { id: employeeId, role: UserRole.EMPLOYEE },
      ['company']
    );

    if (employee && employee.company) {
      const company = employee.company;
      const duration = company.appointmentDuration ?? 60;

      const openingTime = parseTime(company.opensAt);
      const closingTime = parseTime(company.closesAt);

      // opening time
      let opening = new Date(date);
      opening.setHours(
        openingTime.hours,
        openingTime.minutes,
        openingTime.seconds
      );
      console.log('Opening Time:', opening.toString());

      let close = new Date(date);
      close.setHours(
        closingTime.hours,
        closingTime.minutes,
        closingTime.seconds
      );
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
    } else {
      res.sendStatus(401);
    }
  }
}
