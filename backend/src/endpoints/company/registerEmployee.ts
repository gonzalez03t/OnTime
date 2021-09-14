import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { getSessionUser } from '../../util/session';

/**
 * This endpoint will associate a user as an employee of the company
 */
export default async function registerEmployee(req: Request, res: Response) {
  const { firstName, lastName, email, password, phone } = req.body;

  const existingUser = await em.findOne(User, {
    email,
  });

  const admin = await getSessionUser(req);

  if (admin) {
    if (existingUser) {
      res
        .status(500)
        .send('You already have an employee with these credentials.');
    } else {
      const newUser = em.create(User, {
        firstName,
        lastName,
        email,
        phone,
        password: await User.generateHash(password),
        company: admin.company!,
      });

      await em
        .persistAndFlush(newUser)
        .then(async () => {
          res.status(201).send('Employee created.');
        })
        .catch((err) => res.status(500).send(err));
    }
  } else {
    res.sendStatus(403);
  }
}
