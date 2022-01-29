import bcrypt from 'bcryptjs';
import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import moment from 'moment';

export const OTP_EXIRE_IN_MIN = Number(process.env.OTP_EXIRE_IN_MIN);

export enum TokenType {
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

@Entity()
@Unique({ properties: ['user', 'type'] })
export class Token extends BaseEntity {
  @Property()
  code!: string; // hash

  @Property()
  expiresAt: Date = Token.getDefaultExpireTime();

  @ManyToOne()
  user!: User;

  @Enum(() => TokenType)
  type!: TokenType;

  // ====== METHODS ====== //

  isExpired() {
    return this.expiresAt < new Date();
  }

  compare(code: string) {
    return bcrypt.compare(code, this.code);
  }

  async refresh(code: string) {
    const hashedCode = await Token.hashCode(code);

    this.code = hashedCode;
    this.expiresAt = Token.getDefaultExpireTime();
  }

  // ====== STATIC METHODS ====== //
  static hashCode(code: string) {
    return bcrypt.hash(code, parseInt(process.env.BCRYPT_SALT!));
  }

  static getDefaultExpireTime() {
    return moment(new Date()).add(OTP_EXIRE_IN_MIN, 'm').toDate();
  }

  static async createToken(code: string, user: User, type: TokenType) {
    const hashedCode = await Token.hashCode(code);

    return new Token(hashedCode, user, type);
  }

  constructor(code: string, user: User, type: TokenType) {
    super();
    this.code = code;
    this.user = user;
    this.type = type;
  }
}
