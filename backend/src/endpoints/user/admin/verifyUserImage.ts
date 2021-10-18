import { Request, Response } from 'express';
import { em } from '../../..';
import { VerificationStatus } from '../../../../@types/enums';
import { User } from '../../../entities/User';

export default async function verifyUserImage(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.params;

  if (!Object.keys(VerificationStatus).includes(status)) {
    res.status(400).send(`${status} is not a valid status`);
  } else {
    const user = await em.findOne(User, { id });

    if (user && user.image) {
      const image = user.image;

      image.setStatus(status as VerificationStatus);

      await em
        .persistAndFlush(user)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else if (user && !user.image) {
      res.status(400).send('User has no image');
    } else {
      res.status(400).send('Could not find target user');
    }
  }
}
