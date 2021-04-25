import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import bcrypt from 'bcryptjs';
import { Appointment } from './Appointment';
import { BaseEntity } from './BaseEntity';

// TODO: other roles? I feel like not all doctors should be admins,
// but all doctors need some of the functions currently available to
// doctors
export enum UserRole {
  BASE = 'BASE',
  DOCTOR = 'DOCTOR', // TODO: use me!
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @Property()
  deactivated: boolean = false; // accounts should be deactivatable

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Unique()
  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  password!: string; // this is a hash

  @Enum(() => UserRole)
  role: UserRole = UserRole.BASE; // default priviledge

  @OneToMany(() => Appointment, (apt) => apt.patient)
  appointments = new Collection<Appointment>(this);

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  isDoctor() {
    return this.role === UserRole.DOCTOR;
  }

  /**
   * This function will validate a given password, comparing it to the hash and
   * determining if it matches.
   */
  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  /**
   * This function will hash a plain-text password. Keep in mind it is static, since
   * password is a non-nullable field this has to be hashed prior to insertion.
   */
  static async generateHash(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT!));
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
  getDoctorDetails() {
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
