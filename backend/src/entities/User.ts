import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import bcrypt from 'bcryptjs';
import { Appointment } from './Appointment';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { Image } from './Image';

export enum UserRole {
  BASE = 'BASE', // user making appointments with companies
  EMPLOYEE = 'EMPLOYEE', // employee of company
  COMPANY_ADMIN = 'COMPANY_ADMIN', // admins of companies
  COMPANY_OWNER = 'COMPANY_OWNER', // owner of a 'company'
  ADMIN = 'ADMIN', // admin of SAAS itself (i.e. developers, managing entities, etc)
}

export enum NotificationPreference {
  ALL = 'ALL',
  REMINDERS_ONLY = 'REMINDERS_ONLY',
  NONE = 'NONE',
}

// email must always be unique, phone must be unique relative to an email. This allows
// company employees to have work and personal accounts while using their personal
// phone number if they do not have a work number.
@Entity()
@Unique({ properties: ['email', 'phone'] })
export class User extends BaseEntity {
  // ====== PROPERTIES ====== //
  @Property()
  deactivated: boolean = false; // accounts should be deactivatable

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  dob!: Date;

  @Property()
  @Unique()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  password!: string; // this is a hash

  // ====== ENUMS ====== //
  @Enum(() => UserRole)
  role: UserRole = UserRole.BASE; // default priviledge

  @Enum(() => NotificationPreference)
  notificationPreference = NotificationPreference.ALL;

  // ====== RELATIONS ====== //
  @Embedded({ object: true })
  image?: Image;

  @ManyToOne(() => Company, { nullable: true })
  company?: Company;

  @OneToMany(() => Appointment, (apt) => apt.client)
  appointments = new Collection<Appointment>(this);

  @ManyToMany(() => Company)
  favoriteCompanies = new Collection<Company>(this);

  // ====== METHODS ====== //
  isBaseUser() {
    return this.role === UserRole.BASE;
  }

  isEmployee() {
    return this.role === UserRole.EMPLOYEE;
  }

  isCompanyAdmin() {
    return (
      this.role === UserRole.COMPANY_ADMIN ||
      this.role === UserRole.COMPANY_OWNER
    );
  }

  isCompanyOwner() {
    return this.role === UserRole.COMPANY_OWNER;
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  /**
   * This function will validate a given password, comparing it to the hash and
   * determining if it matches.
   */
  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  /**
   * This function will hash a plain-text password. Keep in mind it is static, since
   * password is a non-nullable field this has to be hashed prior to insertion.
   */
  static generateHash(password: string) {
    return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT!));
  }

  /**
   * This function is just a utility for concatenating a users name parts together
   */
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * This function will return a subset of the User object, without any of the
   * sensative information
   */
  getDetails() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      role: this.role,
      imageKey: this.image?.getImageKey(),
      notificationPreference: this.notificationPreference,
      dob: this.dob,
    };
  }

  /**
   * This function is really the same as getDetails but with a few more fields,
   * used on login call and viewer call
   */
  getLoginDetails() {
    return {
      ...this.getDetails(),
      role: this.role,
      notificationPreference: this.notificationPreference,
    };
  }

  getEmployeeDetails() {
    return {
      ...this.getDetails(),
      company: this.company?.name,
      companyAddress: this.company?.address.toString(),
    };
  }

  hasAppointments() {
    return this.appointments.length > 0;
  }

  // ====== MUTATORS ====== //

  setDetails(userDetails: any) {
    const { firstName, lastName, email, phone, s3Key } = userDetails;

    this.firstName = firstName ?? this.firstName;
    this.lastName = lastName ?? this.lastName;
    this.email = email ?? this.email;
    this.phone = phone ?? this.phone;

    if (s3Key) {
      if (this.image) {
        this.image.setImageKey(s3Key);
      } else {
        this.image = new Image(s3Key);
      }
    }
  }

  async setPassword(plainText: string) {
    this.password = await User.generateHash(plainText);
  }

  /**
   * This function is just a utility for altering a users role
   */
  changeRole(newRole: UserRole) {
    this.role = newRole;
  }

  makeBaseUser() {
    this.role = UserRole.BASE;
    this.company = undefined;
  }

  makeCompanyEmployee(company: Company) {
    this.role = UserRole.EMPLOYEE;
    this.company = company;
  }

  makeCompanyAdmin(company: Company) {
    this.role = UserRole.COMPANY_ADMIN;
    this.company = company;
  }

  makeCompanyOwner(company: Company) {
    this.role = UserRole.COMPANY_OWNER;
    this.company = company;

    if (this.appointments.length) {
      this.appointments.removeAll();
    }

    if (this.favoriteCompanies.length) {
      this.favoriteCompanies.removeAll();
    }
  }
}
