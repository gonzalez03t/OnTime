import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import sendSms from '../util/sendSms';
import { Appointment } from './Appointment';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Reminder extends BaseEntity {
  @Property()
  remindAt!: Date;

  @ManyToOne(() => Appointment)
  appointment!: Appointment;

  async sendNotification() {
    const { client, startsAt, employee } = this.appointment;

    // this will convert the start time to a human readable time string
    // like 4:20 PM
    const timeString = startsAt.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const message = `Hello ${client.fullName()},
    
You have an appointment with ${employee.fullName()} scheduled for ${timeString}.`;

    sendSms(message, client.phone);
  }

  reschedule(diffInMilliSeconds: number) {
    this.remindAt = new Date(this.remindAt.getTime() + diffInMilliSeconds);
  }
}
