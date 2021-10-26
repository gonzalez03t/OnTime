import { Request, Response } from 'express';
import { em } from '../..';
import { User } from '../../entities/User';
import { getSessionUserAndCompany } from '../../util/session';

/**
 * This endpoint will associate a user as an employee of the company
 */
export default async function registerEmployee(req: Request, res: Response) {
  const { firstName, lastName, email, password, phone, dob } = req.body;

  const admin = await getSessionUserAndCompany(req);

  if (admin && admin.company) {
    const company = admin.company;

    const existingUser = await em.findOne(User, {
      email,
    });

    if (existingUser) {
      res.status(500).send('User already has a base account.');
    } else {
      const newUser = em.create(User, {
        firstName,
        lastName,
        email,
        phone,
        dob,
        password: await User.generateHash(password),
      });

      newUser.makeCompanyEmployee(company);

      // load the relation if not loaded
      if (!company.employees?.isInitialized()) {
        await company.employees.init();
      }

      // add the new employee
      company.addEmployee(newUser);

      await em
        .persistAndFlush([newUser, company])
        .then(async () => {
          res.status(201).send('Employee created.');
        })
        .catch((err) => res.status(500).send(err));
    }
  } else {
    // NO USER LOADED FROM SESSION
    res.sendStatus(403);
  }
}
