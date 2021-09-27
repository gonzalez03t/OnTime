import { Request, Response } from 'express';
import { getSessionUserOrFail } from '../../util/session';

/**
 * This route just returns the favorited companies of the user
 */
export default async function getFavoritedCompanies(
  req: Request,
  res: Response
) {
  const user = await getSessionUserOrFail(req);

  res.status(200).send(user.favoriteCompanies);
}
