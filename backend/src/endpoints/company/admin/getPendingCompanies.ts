import { Request, Response } from 'express';
import { em } from '../../..';
import { VerificationStatus } from '../../../../@types/enums';
import { Company } from '../../../entities/Company';

/**
 */
export default async function getPendingCompanies(_: Request, res: Response) {
  await em
    .find(Company, { status: VerificationStatus.PENDING }, ['owner'])
    .then((companies) =>
      res.send(companies.map((comp) => comp.getAdminDetails()))
    )
    .catch((err) => res.status(500).send(err));
}
