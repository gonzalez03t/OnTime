import totp from 'totp-generator';
import { em } from '..';
import { Token, TokenType } from '../entities/Token';
import { User } from '../entities/User';

export const OTP_SECRET = process.env.OTP_SECRET;
export const OTP_ALGORITHM = process.env.OTP_ALGORITHM;

interface TokenReturn {
  code?: string;
  err?: any;
}

export function generateOtpCode() {
  return String(
    totp(OTP_SECRET!, {
      digits: 4,
      algorithm: OTP_ALGORITHM,
    })
  );
}

export async function createLoginToken(user: User): Promise<TokenReturn> {
  const code = generateOtpCode();

  let token: Token;

  const existing = await em.findOne(Token, { user, type: TokenType.LOGIN });

  // if an otp already exists for the user refresh with new code
  if (existing) {
    token = existing;
    await token.refresh(code);
  } else {
    token = await Token.createToken(code, user, TokenType.LOGIN);
  }

  return em
    .persistAndFlush(token)
    .then(() => {
      return { code };
    })
    .catch((err) => {
      return { err };
    });
}

export async function createToken(
  user: User,
  type: TokenType
): Promise<TokenReturn> {
  const code = generateOtpCode();

  let token: Token;

  const existing = await em.findOne(Token, { user, type });

  // if an otp already exists for the user refresh with new code
  if (existing) {
    token = existing;
    await token.refresh(code);
  } else {
    token = await Token.createToken(code, user, type);
  }

  return em
    .persistAndFlush(token)
    .then(() => {
      return { code };
    })
    .catch((err) => {
      return { err };
    });
}
