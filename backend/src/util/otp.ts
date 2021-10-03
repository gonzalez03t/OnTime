import totp from 'totp-generator';
import { em } from '..';
import { Company } from '../entities/Company';
import { Token, TokenType } from '../entities/Token';
import { User } from '../entities/User';

const OTP_SECRET = process.env.OTP_SECRET;
const OTP_ALGORITHM = process.env.OTP_ALGORITHM;
const OTP_EXIRE_IN_MIN = process.env.OTP_EXIRE_IN_MIN;
const INVITE_EXIRE_IN_DAYS = process.env.INVITE_EXIRE_IN_DAYS;

export function generateOtp(type = TokenType.OTP, digits?: number) {
  const token = totp(OTP_SECRET!, {
    digits: digits ?? 6,
    algorithm: OTP_ALGORITHM,
  });

  let expiresAt = new Date();

  if (type === TokenType.OTP) {
    expiresAt.setHours(
      expiresAt.getHours(),
      expiresAt.getMinutes() + Number(OTP_EXIRE_IN_MIN),
      expiresAt.getSeconds()
    );
  } else {
    expiresAt.setDate(expiresAt.getDate() + Number(INVITE_EXIRE_IN_DAYS));
  }

  return {
    code: String(token),
    expiresAt,
  };
}

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
    existing.code = await Token.hashCode(code);
    existing.expiresAt = expiresAt;

    otp = existing;
  } else {
    otp = await Token.createOtpToken(code, expiresAt, user);
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

export async function startOtpEmployeeInviteFlow(
  user: User,
  company: Company
): Promise<OtpAuthFlowReturn> {
  const { code, expiresAt } = generateOtp(TokenType.EMPLOYEE_INVITE, 8);

  let otp: Token;

  const existing = await em.findOne(Token, {
    user,
    // company,
    type: TokenType.EMPLOYEE_INVITE,
  });

  // if an otp already exists for the user, use new fields
  if (existing) {
    existing.code = await Token.hashCode(code);
    existing.expiresAt = expiresAt;
    existing.company = company;

    otp = existing;
  } else {
    otp = await Token.createInviteToken(code, expiresAt, user, company);
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
