import { Request, Response } from 'express';
import { em } from '../..';
import { Token, TokenType } from '../../entities/Token';
import { getSessionUser, saveSession } from '../../util/session';

export default async function validateOtp(req: Request, res: Response) {
  const { code } = req.body;
  // @ts-ignore
  const { userId } = req.session;

  const user = await getSessionUser(req);

  const otp = await em.findOne(Token, { user, type: TokenType.OTP });

  if (!code) {
    res.status(400).send('The code is required.');
  } else if (!otp) {
    res.status(500).send('Could not verify OTP');
  } else if (otp.isExpired()) {
    res.status(401).send('OTP has expired. Please try logging on again.');
  } else if (!(await otp.compare(code))) {
    console.log(await otp.compare(code));
    res.status(401).send({ valid: false });
  } else {
    em.removeAndFlush(otp)
      .then(() =>
        saveSession(userId, 'authenticated', req)
          .then(() =>
            res.status(200).json({
              valid: true,
            })
          )
          .catch((err) => res.status(500).send(err))
      )
      .catch((err) => res.status(500).send(err));
  }
}
