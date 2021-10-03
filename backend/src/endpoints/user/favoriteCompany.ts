import { Request, Response } from 'express';
import { em } from '../..';
import { Company } from '../../entities/Company';
import { getSessionUserOrFail } from '../../util/session';

/**
 * This route will either favorite or unfavorite a company. If the company is
 * already favorited by the user, it will unfavorite.
 */
export default async function favoriteCompany(req: Request, res: Response) {
  const { companyId } = req.body;

  const user = await getSessionUserOrFail(req);
  const company = await em.findOne(Company, { id: companyId });

  if (company) {
    if (user.favoriteCompanies.contains(company)) {
      user.favoriteCompanies.remove(company);
      res.status(201).send('Unfavorited company.');
    } else {
      user.favoriteCompanies.add(company);
      res.status(201).send('Favorited company.');
    }
  } else {
    res.status(400).send('Could not find target company.');
  }
}
