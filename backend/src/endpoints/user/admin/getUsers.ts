import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';

/**
 * This will return all of the users registered in the database. This is a restricted
 * route, and will only work with JWT tokens holding admin ids. This is also why
 * I do not return ids of users that are ADMIN in any route.
 */
export default async function getUsers(_req: Request, res: Response) {
  await em
    .find(User, {})
    .then((users) => res.send(users.map((user) => user.getDetails())))
    .catch((err) => res.status(500).send(err));
}
