import { Request, Response } from 'express';
import { startOtpEmployeeInviteFlow } from '../../util/otp';
import { getSessionUserOrFail } from '../../util/session';

/**
 *
 */
export default async function inviteEmployee(req: Request, res: Response) {
  const user = await getSessionUserOrFail(req);

  // const company = await em.findOne(Company, { id: companyId });

  if (user?.company) {
    const { code, err } = await startOtpEmployeeInviteFlow(user, user.company);

    if (!code) {
      res.status(500).send(err);
    } else {
      // await sendEmployeeInvite(code, user.email);
      // FIXME: write this function
      console.log('*** INVITE CODE:', code);

      res.status(201).send('Created new OTP.');
    }
  } else {
    res.status(500).send('Could not retrieve target company');
  }
}
