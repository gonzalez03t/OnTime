import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import bcrypt from 'bcryptjs';

export enum TokenType {
  OTP = 'OTP', // used for login auth flow
}

@Entity()
export class Token extends BaseEntity {
  @Property()
  code!: string; // hash

  @Property()
  expiresAt!: Date;

  @OneToOne()
  user!: User;

  @Enum(() => TokenType)
  type!: TokenType;

  isExpired() {
    return this.expiresAt < new Date();
  }

  /**
   * This function will validate a given code, comparing it to the hash and
   * determining if it matches.
   */
  compare(code: string) {
    return bcrypt.compare(code, this.code);
  }

  /**
   * This function will hash a plain-text value
   */
  static hashCode(code: string) {
    return bcrypt.hash(code, parseInt(process.env.BCRYPT_SALT!));
  }

  static async createOtpToken(code: string, expiresAt: Date, user: User) {
    const encryptedCode = await Token.hashCode(code);

    return new Token(encryptedCode, expiresAt, user, TokenType.OTP);
  }

  /**
   *
   * @param code encrypted value
   * @param expiresAt a Date for when the token becomes invalid
   * @param user the user the token is tied to
   * @param type the type of token
   */
  constructor(code: string, expiresAt: Date, user: User, type: TokenType) {
    super();
    this.code = code;
    this.expiresAt = expiresAt;
    this.user = user;
    this.type = type;
  }
}
