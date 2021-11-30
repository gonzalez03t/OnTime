import { Request, Response } from 'express';
import { em } from '../..';
import Invitation from '../../entities/Invitation';
import { getSessionUserOrFail } from '../../util/session';
import { Company } from '../../entities/Company';

/**
 *
 */
export default async function inviteEmployee(req: Request, res: Response) {
  const { email } = req.body;

  const user = await getSessionUserOrFail(req);

  if (user && email) {
    const company = await em.findOne(Company, { owner: user });
    if (company) {
      const invitation = new Invitation(email, company);
      await invitation
        .send()
        .then(async () => {
          em.persistAndFlush(invitation)
            .then(() => res.sendStatus(200))
            .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('User must be a company owner');
    }
  } else if (!email) {
    res
      .status(400)
      .send('You must specify the email address to send the invitation');
  } else {
    res.status(500).send('Could not retrieve target company');
  }
}
