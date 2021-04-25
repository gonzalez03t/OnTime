import { NextFunction, Request, Response } from 'express';

/**
 * This is a basic middleware function that checks if there is a body
 * in the request. If not, the kills the request and sends a 400 status.
 * Otherwise, it calls the next function.
 */
export default function requireBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body) {
    res.status(400).send('Request missing body.');
  } else {
    next();
  }
}
