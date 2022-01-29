import { Request, Response } from 'express';
import { em } from '../..';
import { getSessionUser } from '../../util/session';

/**
 */
export default async function updateUserProfile(req: Request, res: Response) {
  const { userDetails } = req.body;

  const user = await getSessionUser(req);

  if (user) {
    user.setDetails(userDetails);

    await em
      .persistAndFlush(user)
      .then(() => res.json({ user: user.getDetails() }))
      .catch((err) => res.status(500).send(err));
  } else {
    res.sendStatus(403);
  }
}
