import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  OneToOne,
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
  @OneToOne(() => User)
  owner!: User; // whoever created the account

  @ManyToMany(() => User)
  admins = new Collection<User>(this); // does not include owner

  @Property()
  @Unique()
  name!: string; // name of the company

  @Embedded({ object: true })
  image?: Image; // the logo of the company, wrapped in an embedded entity.

  @Property()
  @Unique()
  fullAddress!: string;

  @Property()
  phone!: string;

  @Embedded(() => SubAddress, { array: true, nullable: true })
  subAddresses?: SubAddress[];

  @ManyToMany(() => User)
  employees = new Collection<User>(this);

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  addEmployee(user: User) {
    this.employees.add(user);
  }

  isVerified() {
    return this.status === VerificationStatus.VERIFIED;
  }

  isOwnedBy(user: User) {
    return user === this.owner;
  }

  hasAdmin(user: User) {
    return this.admins.contains(user) || this.isOwnedBy(user);
  }

  hasEmployee(user: User) {
    return this.employees.contains(user);
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      phone: this.phone,
      fullAddress: this.fullAddress,
      subAddresses: this.subAddresses,
    };
  }

  verifyCompany() {
    this.status = VerificationStatus.VERIFIED;
  }

  rejectCompany() {
    this.status = VerificationStatus.DENIED;
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

    this.owner = creator;

    this.name = name;
    this.image = new Image(imageUrl);
    this.fullAddress = fullAddress;
    this.phone = phone;

    if (subAddresses) {
      this.subAddresses = subAddresses.map(
        ({ label, latitude, longitude }) =>
          new SubAddress(label, latitude, longitude)
      );
    }
  }
}