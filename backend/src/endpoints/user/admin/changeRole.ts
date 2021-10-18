import { Request, Response } from 'express';
import { em } from '../../..';
import { User, UserRole } from '../../../entities/User';

/**
 * This route will alter the UserRole of a registered user. Only admins
 * may perform this route.
 */
export default async function changeRole(req: Request, res: Response) {
  const { id } = req.params;
  const { role } = req.body;

  if (!id || !role) {
    res.status(400).send('You must specify user ID and role');
  } else if (!Object.keys(UserRole).includes(role)) {
    res.status(400).send(`${role} is not a valid UserRole`);
  } else {
    const targetUser = await em.findOne(User, { id });

    if (targetUser) {
      targetUser.changeRole(role);
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
