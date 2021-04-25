import { User } from '../src/entities/User';

export type ReminderReturn = {
  remindAt: Date;
  appointment: {
    startsAt: Date;
    endsAt: Date;
    duration: number;
    doctor: Partial<User>;
  };
};
