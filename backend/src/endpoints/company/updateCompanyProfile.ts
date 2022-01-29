import { Request, Response } from 'express';
import { em } from '../..';
import { Company } from '../../entities/Company';

export default async function updateCompanyProfile(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  const company = await em.findOne(Company, { id });

  if (company) {
    const { companyDetails } = req.body;

    company.setDetails(companyDetails);

    await em
      .persistAndFlush(company)
      .then(() => res.json({ company: company.getDetails() }))
      .catch((err) => res.status(500).send(err));
  } else {
    res.sendStatus(401);
  }
}
