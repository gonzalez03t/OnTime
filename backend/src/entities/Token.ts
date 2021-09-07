import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';
import { generateOtp } from '../util/otp';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

export enum TokenType {
  OTP = 'OTP', // used for login auth flow
}

@Entity()
export class Token extends BaseEntity {
  @Property()
  code!: string;

  @Property()
  expiresAt!: Date;

  @OneToOne()
  user!: User;

  @Enum(() => TokenType)
  type!: TokenType;

  isExpired() {
    return this.expiresAt < new Date();
  }

  compare(code: string) {
    return this.code === code;
  }

  static createOtpToken(user: User): Token {
    const { code, expiresAt } = generateOtp();

    return new Token(code, expiresAt, user, TokenType.OTP);
  }

  constructor(code: string, expiresAt: Date, user: User, type: TokenType) {
    super();
    this.code = code;
    this.expiresAt = expiresAt;
    this.user = user;
    this.type = type;
  }
}
