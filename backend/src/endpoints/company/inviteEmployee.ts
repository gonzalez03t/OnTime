import { Request, Response } from 'express';
import Invitation from '../../entities/Invitation';
import { getSessionUserOrFail } from '../../util/session';

/**
 *
 */
export default async function inviteEmployee(req: Request, res: Response) {
  const { email } = req.body;

  const user = await getSessionUserOrFail(req);

  if (user?.company && email) {
    const invitation = new Invitation(email, user.company);
    await invitation
      .send()
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  } else if (!email) {
    res
      .status(400)
      .send('You must specify the email address to send the invitation');
  } else {
    res.status(500).send('Could not retrieve target company');
  }
}
