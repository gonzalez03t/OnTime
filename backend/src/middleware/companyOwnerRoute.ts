import { NextFunction, Request, Response } from 'express';
import { em } from '..';
import { Company } from '../entities/Company';
import { getSessionUser } from '../util/session';

/**
 * Requires the user be an admin of a company
 */
export default async function companyOwnerRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getSessionUser(req);

  if (user && user.isCompanyOwner()) {
    const company = await em.findOne(Company, { owner: user });

    if (company) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else if (user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}
