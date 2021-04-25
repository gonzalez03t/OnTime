import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { saveSession } from '../../util/session';

// TODO: OTP on success for 2fa

/**
 * This route will attempt to find a user, based on credentials in the request body,
 * and very the password. If the password matches, the user id will be stored in the
 * session (which lives in Mongo) and then the user details gets sent as the request
 * (which contains non-sensative user details).
 */
export default async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Missing email and/or password');
  } else {
    const user = await em.findOne(User, { email });

    if (user && (await user.validatePassword(password))) {
      await saveSession(user.id, req)
        .then(() => res.status(200).json({ user: user.getDetails() }))
        .catch((err) => res.status(500).send(err));
    } else {
      res.sendStatus(401);
    }
  }
}
