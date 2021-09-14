import { Request, Response } from 'express';
import { em } from '../..';
import { User, UserRole } from '../../entities/User';

/**
 * This endpoint will retrieve all users associated with a company (employees)
 */
export default async function getEmployees(req: Request, res: Response) {
  const { companyId } = req.body;

  // TODO: include admins?
  await em
    .find(User, { company: companyId, role: UserRole.EMPLOYEE })
    .then((users) => users.map((user) => user.getEmployeeDetails()))
    .catch((err) => res.status(500).send(err));
}
