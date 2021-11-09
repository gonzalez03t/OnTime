import { Request, Response } from 'express';
import { em } from '../../..';
import { VerificationStatus } from '../../../../@types/enums';
import { Company } from '../../../entities/Company';

export default async function verifyCompany(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.keys(VerificationStatus).includes(status)) {
    res.status(400).send(`${status} is not a valid status`);
  } else {
    const company = await em.findOne(Company, { id });

    if (company) {
      company.setStatus(status as VerificationStatus);

      await em
        .persistAndFlush(company)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('Could not find target company');
    }
  }
}
