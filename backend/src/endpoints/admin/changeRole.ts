import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';

/**
 * This route will alter the UserRole of a registered user. Only admins
 * may perform this route.
 */
export default async function changeRole(req: Request, res: Response) {
  const { email, newRole } = req.body;

  if (!email || !newRole) {
    // TODO: give meaningful response
    res.sendStatus(400);
  } else {
    const targetUser = await em.findOne(User, { email });

    if (targetUser) {
      // TODO: check if this is a valid role
      targetUser.changeRole(newRole);
      await em
        .persistAndFlush(targetUser)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      // TODO: give meaningful response
      res.sendStatus(500);
    }
  }
}
