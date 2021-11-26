import { Request, Response } from 'express';
import { getSessionUser } from '../../util/session';

/**
 * This endpoint will register a new company using the constructor of the
 * Company entity. Internally, the user initiating the creation request will be
 * added as an admin for the company's page.
 */
export default async function hasFutureAppointments(
  req: Request,
  res: Response
) {
  const user = await getSessionUser(req, ['appointments']);

  if (user) {
    res.send(user.hasFutureAppointments());
  } else {
    res.sendStatus(401);
  }
}
