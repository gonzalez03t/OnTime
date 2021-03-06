import { TokenType } from '@mikro-orm/mongo-highlighter/enums';
import { NextFunction, Request, Response } from 'express';
import { em } from '..';
import { Token } from '../entities/Token';
import { User } from '../entities/User';
import { getSessionUser } from '../util/session';

export default async function validateOtpCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let user = await getSessionUser(req);
  const { tokenType, code, email, phone } = req.body;

  if (!user && email && phone) {
    user = await em.findOne(User, { email, phone });
  }

  if (user && tokenType && code) {
    const token = await em.findOne(Token, {
      type: tokenType,
      user,
    });

    if (token) {
      if (await token.compare(code)) {
        next();
      } else {
        res.sendStatus(403);
      }
    } else if (!Object.values(TokenType).includes(tokenType)) {
      res.status(400).send(`${tokenType} is not a valid token type.`);
    } else {
      res.sendStatus(500);
    }
  } else if (!tokenType || !code) {
    res.status(400).send('You must specify a tokenType and code.');
  } else {
    res.sendStatus(403);
  }
}
