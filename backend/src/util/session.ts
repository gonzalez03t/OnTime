import { Request } from 'express';

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
