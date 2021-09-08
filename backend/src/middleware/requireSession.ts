import { NextFunction, Request, Response } from 'express';

/**
 * This function will validate that a user session has been created. It does
 * not need to be authenticated, however a user needs to be associated.
 */
export default function requireSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore: bug but promise this works
  if (!req.session?.userId) {
    res.status(401).send('The session has expired');
  } else {
    next();
  }
}
