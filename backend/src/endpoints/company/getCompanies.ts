import { Request, Response } from 'express';
import { em } from '../..';
import { VerificationStatus } from '../../../@types/enums';
import { Company } from '../../entities/Company';

/**
 * This endpoint will retrieve all verified companies
 */
export default async function getCompanies(_req: Request, res: Response) {
  await em
    .find(Company, { status: VerificationStatus.VERIFIED })
    .then((companies) => res.send(companies))
    .catch((err) => res.status(500).send(err));
}
