import { NextFunction, Request, Response } from 'express';
import { getSessionUser } from '../util/session';

/**
 * This middleware function enforces an admin session.
 * It will try and load the id from the session and continue on if the user is an admin.
 */
export default async function adminRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getSessionUser(req);

  if (user?.isAdmin()) {
    next();
  } else if (user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}
