import { Request, Response } from 'express';
import { em } from '../..';
import { Company } from '../../entities/Company';
import { getSessionUser } from '../../util/session';

/**
 * This endpoint will register a new company using the constructor of the
 * Company entity. Internally, the user initiating the creation request will be
 * added as an admin for the company's page.
 */
export default async function registerCompany(req: Request, res: Response) {
  const user = await getSessionUser(req);

  if (user) {
    const { name, imageUrl, fullAddress, subAddresses, phone } = req.body;

    if (!name || !fullAddress || !phone) {
      res
        .status(400)
        .send('Company name, address and phone number are required.');
    } else if (user.hasAppointments()) {
      res
        .status(403)
        .send(
          'You must cancel your scheduled appointments before converting to a company account.'
        );
    } else {
      const company = new Company(
        user,
        name,
        imageUrl,
        fullAddress,
        phone,
        subAddresses
      );

      // update the user's company
      user.makeCompanyOwner(company);

      await em
        .persistAndFlush([company, user])
        .then(() => res.sendStatus(201))
        .catch((err) => res.status(500).send(err));
    }
  } else {
    res.sendStatus(403);
  }
}
