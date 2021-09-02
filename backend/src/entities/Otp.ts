import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class Otp extends BaseEntity {
  @Property()
  code!: string;

  @Property()
  expiresAt!: Date;

  @OneToOne()
  user!: User;

  isExpired() {
    return this.expiresAt < new Date();
  }
}
