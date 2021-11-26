import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { Reminder } from './Reminder';
import { User } from './User';

// TODO: set up cronjob to occassionally remove stored, past appointments?
// TODO: add an approved status
export enum AppointmentStatus {
  PENDING = 'PENDING',
  MISSED = 'MISSED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Appointment extends BaseEntity {
  @ManyToOne()
  company!: Company;

  @ManyToOne()
  client!: User;

  @Property()
  startsAt!: Date; // startsAt

  @ManyToOne()
  employee!: User;

  @Property()
  duration: number = 60; // measured in MINUTES

  @Enum(() => AppointmentStatus)
  status: AppointmentStatus = AppointmentStatus.PENDING;

  @OneToMany({
    entity: () => Reminder,
    mappedBy: 'appointment',
    orphanRemoval: true,
  })
  reminders = new Collection<Reminder>(this);

  /**
   * This will return a Date object that references the date/time an appointment
   * is scheduled to end, based on the start time and duration (in minutes)
   */
  getEndTime() {
    return new Date(this.startsAt.getTime() + this.duration * 60000);
  }

  /**
   * This function returns a subset of the Appointment object. Intended
   * to be used to populate calenders with filled slots, without revealing
   * sensative data.
   */
  getDetails(employee = false) {
    let baseInfo = {
      startsAt: this.startsAt,
      endsAt: this.getEndTime(),
      duration: this.duration,
    };

    if (employee) {
      Object.assign(baseInfo, { client: this.client.getDetails() });
    } else {
      Object.assign(baseInfo, { employee: this.employee.getEmployeeDetails() });
    }

    return baseInfo;
  }

  isFuture() {
    return this.startsAt > new Date();
  }

  /**
   * This will return a Date object that references the date/time a given
   * amount of time prior to the scheduled appointment. For now, I am just
   * using the duration.
   */
  getDefaultReminderTime() {
    return new Date(this.startsAt.getTime() - this.duration * 60000);
  }

  // I have defined some shortcuts below to update the status of an appointment
  // this is so I do not have to import AppointmentStatus everywhere
  cancel() {
    this.status = AppointmentStatus.CANCELLED;
    this.reminders.removeAll();
  }

  missed() {
    this.status = AppointmentStatus.MISSED;
  }

  complete() {
    this.status = AppointmentStatus.COMPLETED;
  }

  async reschedule(newDate: Date) {
    const diffTime = Math.abs(newDate.getTime() - this.startsAt.getTime()); // milliseconds

    this.startsAt = newDate;

    this.reminders
      .getItems()
      .forEach((reminder) => reminder.reschedule(diffTime));
  }
}
