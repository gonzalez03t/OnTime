import { Request, Response } from 'express';
import { em } from '../..';
import { Otp } from '../../entities/Otp';
import { saveSession } from '../../util/session';

export default async function validateOtp(req: Request, res: Response) {
  const { code } = req.body;
  // @ts-ignore
  const { userId } = req.session;

  const otp = await em.findOne(Otp, { user: userId });

  if (!code) {
    res.status(400).send('The code is required.');
  } else if (!otp) {
    res.status(500).send('Could not verify OTP');
  } else if (otp.isExpired()) {
    res.status(401).send('OTP has expired. Please try logging on again.');
  } else if (otp.code !== code) {
    res.status(401).send({ valid: false });
  } else {
    await saveSession(userId, 'validated', req)
      .then(() =>
        res.status(200).json({
          valid: true,
        })
      )
      .catch((err) => res.status(500).send(err));
  }
}