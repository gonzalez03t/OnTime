import { Request, Response } from 'express';
import { createLoginToken } from '../../util/otp';
import { sendOtpSms } from '../../util/sendSms';
import { getSessionUser } from '../../util/session';

/**
 * This function will be used to regenerate OTP's if a user lets a previous one expire
 * while they are on the OTP entry page. Since this is the intended usage, it is
 * assumed a user already has a session (i.e. they already completed the login step
 * of the auth flow).
 */
export default async function createNewLoginOtp(req: Request, res: Response) {
  const user = await getSessionUser(req);

  if (user) {
    const { code, err } = await createLoginToken(user);

    if (!code) {
      res.status(500).send(err);
    } else {
      await sendOtpSms(code, user.phone);

      res.status(201).send('Created new OTP.');
    }
  } else {
    res.status(401).send('Invalid session.');
  }
}
