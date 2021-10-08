import { Request, Response } from 'express';

export default async function createForgotPasswordToken(
  req: Request,
  res: Response
) {
  console.log(req.body);

  res.sendStatus(500);
}
