import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import moment from 'moment';
import { generate } from 'randomstring';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';

export const INVITE_EXIRE_IN_DAYS = process.env.INVITE_EXIRE_IN_DAYS;

@Entity()
@Unique({ properties: ['email', 'company'] })
export default class Invitation extends BaseEntity {
  @Property()
  code!: string;

  @Property()
  email!: string;

  @Property()
  expiresAt: Date = moment(new Date())
    .add(Number(INVITE_EXIRE_IN_DAYS), 'd')
    .toDate();

  @ManyToOne()
  company!: Company;

  // ====== METHODS ====== //
  getInvitationLink() {
    return `${process.env.FRONTEND_URL}/sign_up?token=${this.code}`;
  }

  async send() {
    // TODO: implement me, should email this.email
  }

  constructor(email: string, company: Company) {
    super();
    this.code = generate({ length: 32 });
    this.email = email;
    this.company = company;
  }
}
