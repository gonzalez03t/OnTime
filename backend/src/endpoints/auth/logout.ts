import { Request, Response } from 'express';
import { destroySession } from '../../util/session';

export default async function logout(req: Request, res: Response) {
  await destroySession(req)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
}
