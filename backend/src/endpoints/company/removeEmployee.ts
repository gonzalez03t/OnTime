import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { Company } from '../../entities/Company';
import { getSessionUser } from '../../util/session';

/**
 * This endpoint will associate a user as an employee of the company
 */
export default async function removeEmployee(req: Request, res: Response) {
  const { employeeId } = req.body;

  const user = await getSessionUser(req);

  if (user && user.isCompanyOwner()) {
    const company = await em.findOne(Company, { owner: user });

    const existingUser = await em.findOne(User, {
      id: employeeId,
    });

    if (!existingUser) {
      res.status(500).send('User does not exist');
    } else if (company) {
      // load the relation if not loaded
      if (!company.employees?.isInitialized()) {
        await company.employees.init();
      }

      // remove the employee
      company.removeEmployee(existingUser);

      await em
        .persistAndFlush([existingUser, company])
        .then(async () => {
          res.status(201).send('Employee removed from company.');
        })
        .catch((err) => res.status(500).send(err));
    }
  } else {
    // NO USER LOADED FROM SESSION
    res.sendStatus(403);
  }
}
