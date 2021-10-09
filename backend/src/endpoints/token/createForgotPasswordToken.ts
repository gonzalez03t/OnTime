import { Request, Response } from 'express';
import { em } from '../..';
import { TokenType } from '../../entities/Token';
import { User } from '../../entities/User';
import { createToken } from '../../util/otp';

export default async function createForgotPasswordToken(
  req: Request,
  res: Response
) {
  const { email, phone } = req.body;

  const user = await em.findOne(User, { email, phone });

  if (user) {
    const { code, err } = await createToken(user, TokenType.FORGOT_PASSWORD);

    if (!code) {
      res.status(500).send(err);
    } else {
      console.log('*** FORGOT PASSWORD CODE:', code);
      res.sendStatus(200);
    }
  } else {
    // do not let user know an account doesn't exist
    res.sendStatus(200);
  }
}
