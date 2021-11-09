import { Request, Response } from 'express';
import { em } from '../..';
import Address from '../../entities/Address';
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
    // const { name, imageUrl, address, subAddresses, phone } = req.body;
    const { name, address: rawAddress, phone } = req.body;

    if (!name || !rawAddress || !phone) {
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
      const { street, unit, city, stateProvince, postalCode, country } =
        rawAddress;

      const address = new Address(
        street,
        city,
        stateProvince,
        postalCode,
        country,
        unit
      );

      const company = em.create(Company, {
        owner: user,
        name,
        address,
        phone,
      });

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
