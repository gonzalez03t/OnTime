import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { createLoginToken } from '../../util/otp';
import { sendOtpSms } from '../../util/sendSms';
import { saveSession } from '../../util/session';

/**
 * This route will attempt to find a user, based on credentials in the request body,
 * and very the password. If the password matches, the user id will be stored in the
 * session (which lives in Mongo) and then the user details gets sent as the request
 * (which contains non-sensative user details). An OTP will be generated, finalizing
 * the session once the user validates. Session will be 'pending_otp_validation' until
 * the OTP is validated.
 */
export default async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Missing email and/or password');
  } else {
    const user = await em.findOne(User, { email });

    console.log(user);

    if (user && (await user.validatePassword(password))) {
      const { code, err } = await createLoginToken(user);

      if (!code) {
        res.status(500).send(err);
      } else {
        await sendOtpSms(code, user.phone);

        await saveSession(user.id, 'pending_otp_validation', req)
          .then(() =>
            res.status(200).json({
              user: user.getLoginDetails(),
              status: 'pending_otp_validation',
            })
          )
          .catch((error) => res.status(500).send({ err: error }));
      }
    } else {
      res.sendStatus(401);
    }
  }
}
