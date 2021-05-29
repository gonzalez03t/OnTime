import jwt from 'jsonwebtoken';

// README!!
// NOTE: these functions are not currently used. I transitioned to using session
// based auth, since this needs to be HIPAA compliant and the previous project group
// have non-expiring JWT tokens as their auth system.

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * This function signs a token with the provided user id. In order to give an
 * expiration date on a JWT, I needed to sign it with an object. This is why
 * I am not just passing in the id directly.
 *
 * @param id - the 'PK' of a user DB entry
 * @returns string - the token signed with the id
 */
export function signToken(id: string) {
  return jwt.sign({ id: String(id) }, JWT_SECRET!, {
    expiresIn: 1500,
  });
}

/**
 * This function simply verifies a token extracted from a request.
 *
 * @param token string - the token embeded in a request
 * @returns string | object | undefined -> object === sucess
 */
export function getIdFromToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch {
    return null;
  }
}
