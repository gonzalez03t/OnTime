import { NextFunction, Request, Response } from 'express';
import { getSessionUserAndCompany } from '../util/session';

/**
 * Requires the user be an admin of a company
 */
export default async function companyAdminRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getSessionUserAndCompany(req);

  if (user && user.isCompanyAdmin() && user.company) {
    if (user.company && user.company.hasAdmin(user)) {
      next();
    } else {
      res.sendStatus(401);
    }
  } else if (user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}
