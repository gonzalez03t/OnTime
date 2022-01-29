import { Request } from 'express';
import { em } from '..';
import { User } from '../entities/User';

// TODO: look into if I am doing this correctly. I want to trigger the catch
// on the caller of this function on failure.
export async function saveSession(id: string, status: string, req: Request) {
  // @ts-ignore: bug but promise this works
  req.session.userId = id;
  // @ts-ignore: bug but promise this works
  req.session.status = status;

  return req.session.save((err) => {
    if (err) {
      throw new Error(err);
    }
  });
}

// TODO: look into if I am doing this correctly. I want to trigger the catch
// on the caller of this function on failure.
export async function destroySession(req: Request) {
  return req.session.destroy((err) => {
    if (err) {
      throw new Error(err);
    }
  });
}

export function getSessionUser(
  req: Request,
  relations?: string[]
): Promise<User | null> {
  // @ts-ignore: bug but promise this works
  const { userId } = req.session;

  return em.findOne(User, { id: userId }, relations);
}

export function getSessionUserOrFail(req: Request, relations?: string[]) {
  // @ts-ignore: bug but promise this works
  const { userId } = req.session;

  return em.findOneOrFail(User, { id: userId }, relations);
}

export async function getSessionUserAndCompany(req: Request) {
  // @ts-ignore: bug but promise this works
  const { userId } = req.session;

  // I am populating the relations here, lazy loading
  return em.findOne(User, { id: userId }, [
    'company',
    'company.admins',
    'company.employees',
  ]);
}
