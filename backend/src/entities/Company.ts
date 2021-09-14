import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';
import { SubAddressType } from '../../@types/types';
import { BaseEntity } from './BaseEntity';
import { Image } from './Image';
import { SubAddress } from './SubAddress';
import { User } from './User';

/**
 *
 */
@Entity()
@Unique({ properties: ['name', 'fullAddress'] })
export class Company extends BaseEntity {
  @ManyToMany(() => User)
  admins = new Collection<User>(this);

  @Property()
  @Unique()
  name!: string;

  @Embedded({ object: true })
  image?: Image;

  @Property()
  @Unique()
  fullAddress!: string;

  @Property()
  phone!: string;

  @Embedded(() => SubAddress, { array: true, nullable: true })
  subAddresses?: SubAddress[];

  @OneToMany(() => User, (user) => user.company)
  employees = new Collection<User>(this);

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  addEmployee(user: User) {
    this.employees.add(user);
  }

  isVerified() {
    return this.status === VerificationStatus.VERIFIED;
  }

  constructor(
    creator: User,
    name: string,
    imageUrl: string,
    fullAddress: string,
    phone: string,
    subAddresses?: SubAddressType[]
  ) {
    super();

    this.admins.add(creator);
    // FIXME: is this necessary?
    this.employees.add(creator);

    this.name = name;
    this.image = new Image(imageUrl);
    this.fullAddress = fullAddress;
    this.phone = phone;

    if (subAddresses) {
      this.subAddresses = subAddresses.map(
        ({ name, latitude, longitude }) =>
          new SubAddress(name, latitude, longitude)
      );
    }
  }
}
