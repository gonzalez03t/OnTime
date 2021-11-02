import { Request, Response } from 'express';
import { getSessionUserOrFail } from '../../util/session';

/**
 * This route just returns the favorited companies of the user
 */
export default async function getFavoritedCompanies(
  req: Request,
  res: Response
) {
  await getSessionUserOrFail(req, ['favoriteCompanies'])
    .then((user) => res.status(200).send(user.favoriteCompanies))
    .catch((err) => res.status(500).send(err));
}
