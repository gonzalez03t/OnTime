import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import { em } from '..';

/**
 * This middleware function enforces an admin OR doctor session.
 * It will try and load the id from the session and continue on if the user is either.
 */
export default async function adminRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore: bug but promise it works
  const { userId } = req.session;

  await em
    .findOneOrFail(User, { id: userId })
    .then((user) => {
      if (user && (user.isAdmin() || user.isDoctor())) {
        next();
      } else if (user) {
        res.sendStatus(403);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => res.status(500).send(err));
}
