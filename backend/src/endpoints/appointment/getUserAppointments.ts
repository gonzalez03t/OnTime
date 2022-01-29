import { FilterQuery } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment, AppointmentStatus } from '../../entities/Appointment';
import { getSessionUser } from '../../util/session';

/**
 * This function will return all the appointments for the logged in user.
 */
export default async function getUserAppointments(req: Request, res: Response) {
  const user = await getSessionUser(req);

  let whereClause: FilterQuery<Appointment> | null = null;
  let relations = ['reminders'];

  if (user?.isEmployee()) {
    relations.push('client');
    whereClause = {
      employee: user,
    };
  } else if (user?.isBaseUser()) {
    relations.push('employee', 'employee.company');
    whereClause = {
      client: user,
    };
  }

  if (whereClause && relations.length > 1) {
    whereClause = {
      ...whereClause,
      status: { $ne: AppointmentStatus.CANCELLED },
    };

    await em
      .find(Appointment, whereClause, relations)
      .then((appointments) =>
        res.send(
          appointments.map((appt) => appt.getDetails(user?.isEmployee()))
        )
      )
      .catch((err) => res.status(500).send(err));
  } else {
    res.sendStatus(503);
  }
}
