import { Request, Response } from 'express';
import { em } from '../..';
import { Company } from '../../entities/Company';

/**
 * This endpoint will retrieve all users associated with a company (employees)
 */
export default async function getEmployees(req: Request, res: Response) {
  const { companyId } = req.body;

  const company = await em.findOne(Company, { id: companyId }, ['employees']);

  if (company) {
    const employees = company.employees
      .getItems()
      .map((empl) => empl.getEmployeeDetails());

    res.send(employees);
  } else {
    res.status(500).send('Could not retrieve target company');
  }
}
