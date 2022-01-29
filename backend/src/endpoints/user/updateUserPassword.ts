import { Request, Response } from 'express';
import { em } from '../..';
import { getSessionUser } from '../../util/session';

/**
 */
export default async function updateUserPassword(req: Request, res: Response) {
  const { password } = req.body;

  const user = await getSessionUser(req);

  if (user) {
    await user.setPassword(password);

    await em
      .persistAndFlush(user)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  } else {
    res.sendStatus(403);
  }
}
