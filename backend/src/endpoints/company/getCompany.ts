import { Request, Response } from 'express';
import { em } from '../..';
import { VerificationStatus } from '../../../@types/enums';
import { Company } from '../../entities/Company';

/**
 */
export default async function getCompany(req: Request, res: Response) {
  const { name } = req.params;

  await em
    .findOne(Company, { name, status: VerificationStatus.VERIFIED }, [
      'employees',
    ])
    .then((company) => res.json({ company: company?.getDetails() }))
    .catch((err) => res.status(500).send(err));
}
