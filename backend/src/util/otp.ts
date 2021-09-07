import totp from 'totp-generator';
import { em } from '..';
import { Token, TokenType } from '../entities/Token';
import { User } from '../entities/User';

const OTP_SECRET = process.env.OTP_SECRET;
const OTP_ALGORITHM = process.env.OTP_ALGORITHM;
const OTP_EXIRE_IN_MIN = process.env.OTP_EXIRE_IN_MIN;

export function generateOtp() {
  const token = totp(OTP_SECRET!, { digits: 6, algorithm: OTP_ALGORITHM });
  const validTime = Number(OTP_EXIRE_IN_MIN);

  let expiresAt = new Date();

  expiresAt.setHours(
    expiresAt.getHours(),
    expiresAt.getMinutes() + validTime,
    expiresAt.getSeconds()
  );

  return {
    code: String(token),
    expiresAt,
  };
}

export function validateOtp() {}

interface OtpAuthFlowReturn {
  code?: string;
  err?: any;
}

export async function startOtpAuthFlow(user: User): Promise<OtpAuthFlowReturn> {
  const { code, expiresAt } = generateOtp();

  let otp: Token;

  const existing = await em.findOne(Token, { user, type: TokenType.OTP });

  // if an otp already exists for the user, use new fields
  if (existing) {
    existing.code = code;
    existing.expiresAt = expiresAt;

    otp = existing;
  } else {
    otp = Token.createOtpToken(user);
  }

  return em
    .persistAndFlush(otp)
    .then(() => {
      return { code };
    })
    .catch((err) => {
      return { err };
    });
}
