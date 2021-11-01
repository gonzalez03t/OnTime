import { Request, Response } from 'express';
import { em } from '../..';
import { VerificationStatus } from '../../../@types/enums';
import { Company } from '../../entities/Company';

/**
 */
export default async function getCompany(req: Request, res: Response) {
  const { name, ownerId } = req.query;

  if (name && typeof name === 'string') {
    await em
      .findOneOrFail(Company, { name, status: VerificationStatus.VERIFIED }, [
        'employees',
      ])
      .then((company) => res.json({ company: company.getDetails() }))
      .catch((_err) => res.sendStatus(400));
  } else if (ownerId && typeof ownerId === 'string') {
    await em
      .findOneOrFail(
        Company,
        { owner: ownerId, status: VerificationStatus.VERIFIED },
        ['employees']
      )
      .then((company) => res.json({ company: company.getDetails() }))
      .catch((_err) => res.sendStatus(400));
  } else {
    await em
      .find(Company, { status: VerificationStatus.VERIFIED })
      .then((companies) => res.send(companies.map((comp) => comp.getDetails())))
      .catch((err) => res.status(500).send(err));
  }
}
