import { User } from '../src/entities/User';

export type ReminderReturn = {
  remindAt: Date;
  appointment: {
    startsAt: Date;
    endsAt: Date;
    duration: number;
    employee: Partial<User>;
  };
};

export type SubAddressType = {
  label: string;
  latitude: number;
  longitude: number;
};
