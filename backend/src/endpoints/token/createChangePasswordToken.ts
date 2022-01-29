import { Request, Response } from 'express';
import { TokenType } from '../../entities/Token';
import { createToken } from '../../util/otp';
import { getSessionUser } from '../../util/session';

export default async function createChangePasswordToken(
  req: Request,
  res: Response
) {
  const user = await getSessionUser(req);

  if (user) {
    const { code, err } = await createToken(user, TokenType.CHANGE_PASSWORD);

    if (!code) {
      res.status(500).send(err);
    } else {
      // TODO: send code;
      console.log('*** CHANGE PASSWORD CODE:', code);
      res.sendStatus(201);
    }
  } else {
    res.sendStatus(403);
  }
}
