import { NextFunction, Request, Response } from 'express';

/**
 * This function will validate that a user session has been created and is authenticated
 * Other routes will determine if the session has since expired.
 * The session manager automatically handles to deletion of expired
 * sessions from the DB.
 */
export default function authenticatedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore: bug but promise this works
  if (!req.session?.userId) {
    res.status(401).send('The session has expired');
  }

  // @ts-ignore: bug but promise this works
  else if (req.session?.status !== 'authenticated') {
    res.status(401).send('The session could not authenticated');
  } else {
    next();
  }
}
