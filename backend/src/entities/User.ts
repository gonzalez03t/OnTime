import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import bcrypt from 'bcryptjs';
import { Appointment } from './Appointment';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';

export enum UserRole {
  BASE = 'BASE',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

@Entity()
@Unique({ properties: 'email' })
export class User extends BaseEntity {
  @Property()
  deactivated: boolean = false; // accounts should be deactivatable

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  password!: string; // this is a hash

  @Enum(() => UserRole)
  role: UserRole = UserRole.BASE; // default priviledge

  @ManyToOne()
  company?: Company;

  @OneToMany(() => Appointment, (apt) => apt.client)
  appointments = new Collection<Appointment>(this);

  isEmployee() {
    return this.role === UserRole.EMPLOYEE;
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
    };
  }

  /**
   * This function is a more restricted version of User.getDetails() above. It is
   * meant to be used when BASE users request information about ADMIN users
   */
  getEmployeeDetails() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }

  /**
   * This function is just a utility for altering a users role
   */
  changeRole(newRole: UserRole) {
    this.role = newRole;
  }
}
