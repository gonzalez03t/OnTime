import { NextFunction, Request, Response } from 'express';
import { em } from '..';
import { Company } from '../entities/Company';
import { getSessionUser } from '../util/session';

/**
 * Requires the user be an admin of a company
 */
export default async function companyAdminRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getSessionUser(req);

  if (user && user.isCompanyAdmin()) {
    const company = await em.findOne(
      Company,
      { admins: { $contains: [user.id] } },
      ['admins']
    );

    if (company && company.hasAdmin(user)) {
      next();
    }
  } else if (user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}
