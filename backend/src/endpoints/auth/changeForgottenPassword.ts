import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';

/**
 *
 */
export default async function changeForgottenPassword(
  req: Request,
  res: Response
) {
  const { email, phone, password } = req.body;

  const user = await em.findOne(User, { email, phone });

  if (user) {
    await user.setPassword(password);

    await em
      .persistAndFlush(user)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  } else {
    // server error because the previous middleware succeeding loaded a user,
    // so this shouldn't even hit once in this endpoint
    res.sendStatus(500);
  }
}
