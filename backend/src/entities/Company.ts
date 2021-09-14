import {
  Collection,
  Embedded,
  Enum,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';
import { Image } from './Image';
import { SubAddress } from './SubAddress';
import { User } from './User';

/**
 *
 */
export class Company {
  @Property()
  name!: string;

  @OneToOne()
  image?: Image;

  @Property()
  fullAddress!: string;

  @Property()
  phone!: string;

  @Embedded(() => SubAddress, { array: true }) subAddresses: SubAddress[] = [];

  @OneToMany(() => User, (user) => user.company)
  employees = new Collection<User>(this);

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  isVerified() {
    return this.status === VerificationStatus.VERIFIED;
  }
}
