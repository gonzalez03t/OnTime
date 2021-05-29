import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { saveSession } from '../../util/session';

// TODO: otp for 2fa

/**
 * This route will attempt to register a new user. If the user does not already
 * exist in the system, they will be added to the DB.
 */
export default async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password, phone } = req.body;

  const existingUser = await em.findOne(User, {
    email,
  });

  if (existingUser) {
    // discretely throw error without letting user know an account exists
    // TODO: change status?
    res.status(500).send('Unable to register account.');
  } else {
    const newUser = em.create(User, {
      firstName,
      lastName,
      email,
      phone,
      password: await User.generateHash(password),
    });

    await em
      .persistAndFlush(newUser)
      .then(async () => {
        await saveSession(newUser.id, req)
          .then(() => res.status(200).json({ user: newUser.getDetails() }))
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  }
}
