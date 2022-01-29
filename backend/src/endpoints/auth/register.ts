import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';

/**
 * This route will attempt to register a new user. If the user does not already
 * exist in the system, they will be added to the DB. They are not yet authenticated,
 * the user must then log in to their new account to enter that flow.
 */
export default async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password, phone, dob } = req.body;

  const existingUser = await em.findOne(User, {
    email,
  });

  if (existingUser) {
    // discretely throw error without letting user know an account exists
    // TODO: change status?
    res.status(500).send('Unable to register account.');
  } else {
    let dateDob;
    if (typeof dob === 'string') {
      dateDob = new Date(dob);
    }

    const newUser = em.create(User, {
      firstName,
      lastName,
      email,
      phone,
      // use dateDob unless it is undefined, which means dob was a Date
      dob: dateDob ?? dob,
      password: await User.generateHash(password),
    });

    await em
      .persistAndFlush(newUser)
      .then(async () => {
        res.status(201).send('User created.');
      })
      .catch((err) => res.status(500).send(err));
  }
}
