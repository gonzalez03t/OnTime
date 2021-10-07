import { Request, Response } from 'express';
import { em } from '../..';
import { NotificationPreference } from '../../entities/User';
import { getSessionUser } from '../../util/session';

/**
 */
export default async function updateNotificationPreference(
  req: Request,
  res: Response
) {
  const { newPreference } = req.body;

  if (Object.values(NotificationPreference).includes(newPreference)) {
    const user = await getSessionUser(req);

    if (user) {
      user.notificationPreference = newPreference;

      await em
        .persistAndFlush(user)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.sendStatus(500);
    }
  } else {
    res.status(400).send('That is not a valid preference');
  }
}
