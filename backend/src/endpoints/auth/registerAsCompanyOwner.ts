import { Request, Response } from 'express';
import { em } from '../..';
import {
  registerCompanyOwnerCompany,
  registerCompanyOwnerUser,
} from '../../util/register';

/**
 * This will attempt to create a user and then a company all at once.
 * The user will be created, and passed to a function to handle the creation
 * of the company. I don't love this solution, so it should be thought of as potential
 * future work to alter the flow for this user use-case.
 */
export default async function registerAsCompanyOwner(
  req: Request,
  res: Response
) {
  const { user, company } = req.body;

  if (!user || !company) {
    res.sendStatus(400);
  } else {
    const userEntity = await registerCompanyOwnerUser(user);

    if (userEntity) {
      const companyEntity = await registerCompanyOwnerCompany(
        userEntity,
        company
      );

      if (companyEntity) {
        await em
          .persistAndFlush([userEntity, companyEntity])
          .then(() => res.sendStatus(201))
          .catch((err) => res.status(500).send(err));
      } else {
        res.status(400).send('Could not create company.');
      }
    } else {
      res
        .status(400)
        .send(
          'Could not user with requested credentials. Please try again or use different information.'
        );
    }
  }
}
