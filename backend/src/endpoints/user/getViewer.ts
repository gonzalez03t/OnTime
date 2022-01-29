import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';

/**
 * This function returns the User object for the viewer (aka the person
 * currently logged in)
 */
export default async function getViewer(req: Request, res: Response) {
  // @ts-ignore: bug but promise it works
  const { userId } = req.session;

  await em
    .findOneOrFail(User, { id: userId })
    .then((user) => res.send({ user: user.getLoginDetails() }))
    .catch((err) => res.status(401).send(err));
}
