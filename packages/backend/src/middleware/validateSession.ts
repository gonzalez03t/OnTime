import { NextFunction, Request, Response } from 'express';

/**
 * This function will validate that a session has been created, and therefore
 * the session is validated. Other routes will determine if the session has since
 * expired. The session manager automatically handles to deletion of expired
 * sessions from the DB.
 */
export default function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session || req.session.userId === undefined) {
    res.status(401).send('The session has expired');
  } else {
    next();
  }
}
