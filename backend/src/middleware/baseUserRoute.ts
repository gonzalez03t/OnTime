import { NextFunction, Request, Response } from 'express';
import { getSessionUser } from '../util/session';

/**
 * Requires the user be a base user
 */
export default async function baseUserRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getSessionUser(req);

  if (user && user.isBaseUser()) {
    next();
  } else if (user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}
