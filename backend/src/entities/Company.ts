import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  OneToOne,
  Property,
  TimeType,
  Unique,
} from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';
import Address from './Address';
import { BaseEntity } from './BaseEntity';
import { Image } from './Image';
import { SubAddress } from './SubAddress';
import { User } from './User';

/**
 *
 */
@Entity()
@Unique({ properties: ['name', 'address'] })
export class Company extends BaseEntity {
  @OneToOne(() => User)
  owner!: User; // whoever created the account

  @ManyToMany(() => User)
  admins = new Collection<User>(this); // does not include owner

  @Property()
  @Unique()
  name!: string; // name of the company

  @Embedded({ object: true, nullable: true })
  image?: Image; // the logo of the company, wrapped in an embedded entity.

  @Embedded({ object: true, nullable: true })
  coverPhoto?: Image;

  @Embedded({ object: true })
  address!: Address;

  @Property()
  phone!: string;

  // this property is used to customize some of the company profile scheduling section,
  // such as 'Select a[n] {employeeTitle}. This was a requested addition
  @Property()
  employeeTitle: string = 'Employee';

  @Property({ type: TimeType })
  opensAt: string = '06:30:00';

  @Property({ type: TimeType })
  closesAt: string = '18:00:00';

  @Property()
  appointmentDuration: number = 60; // measured in MINUTES

  @Property({ nullable: true })
  maxBodyCount?: number;

  @Embedded(() => SubAddress, { array: true, nullable: true })
  subAddresses?: SubAddress[];

  @ManyToMany(() => User)
  employees = new Collection<User>(this);

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  addEmployee(user: User) {
    this.employees.add(user);
    user.makeCompanyEmployee(this);
  }

  removeEmployee(user: User) {
    if (this.employees.contains(user)) {
      this.employees.remove(user);
      user.makeBaseUser();
    }
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
      imageKey: this.image?.getImageKey(),
      coverImageKey: this.coverPhoto?.getImageKey(),
      phone: this.phone,
      address: this.address,
      fullAddress: this.address.toString(),
      subAddresses: this.subAddresses,
      employees: this.employees
        .getItems()
        .map((empl) => empl.getEmployeeDetails()),
      employeeTitle: this.employeeTitle,
      maxBodyCount: this.maxBodyCount,
    };
  }

  // same as above, just includes the owner
  getAdminDetails() {
    return {
      ...this.getDetails(),
      owner: this.owner,
      createdAt: this.createdAt,
    };
  }

  verifyCompany() {
    this.status = VerificationStatus.VERIFIED;
  }

  rejectCompany() {
    this.status = VerificationStatus.DENIED;
  }

  setStatus(status: VerificationStatus) {
    if (status === VerificationStatus.VERIFIED) {
      this.verifyCompany();
    } else if (status === VerificationStatus.DENIED) {
      this.rejectCompany();
    }
  }

  setDetails(companyDetails: any) {
    if (!companyDetails) return;

    const { name, phone, profileS3Key, coverS3Key } = companyDetails;

    this.name = name ?? this.name;
    this.phone = phone ?? this.phone;

    if (profileS3Key) {
      if (this.image) {
        this.image.setImageKey(profileS3Key);
      } else {
        this.image = new Image(profileS3Key);
      }
    }

    if (coverS3Key) {
      if (this.coverPhoto) {
        this.coverPhoto.setImageKey(coverS3Key);
      } else {
        this.coverPhoto = new Image(coverS3Key);
      }
    }
  }

  setSettings(settings: any) {
    if (!settings) return;

    const { employeeTitle, opensAt, closesAt, appointmentDuration } = settings;
    let maxBodyCount = settings.maxBodyCount;

    // treat zero as 'resetting' this setting
    if (maxBodyCount === 0) {
      maxBodyCount = undefined;
    }

    // we allow undefined here
    this.maxBodyCount = maxBodyCount;

    this.employeeTitle = employeeTitle ?? this.employeeTitle;
    this.opensAt = opensAt ?? this.opensAt;
    this.closesAt = closesAt ?? this.closesAt;
    this.appointmentDuration = appointmentDuration ?? this.appointmentDuration;
  }
}
