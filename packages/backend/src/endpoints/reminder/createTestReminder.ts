import { Request, Response } from 'express';
import { em } from '../..';
import { Appointment } from '../../entities/Appointment';
import { Reminder } from '../../entities/Reminder';
import { User } from '../../entities/User';

export default async function createTestReminder(_req: Request, res: Response) {
  const now = new Date();
  //  // 61  min from now, this will schedule the reminder for 1 min from now
  const testAptDate = new Date(now.getTime() + 61 * 60000);

  const patient = await em.findOneOrFail(User, {
    email: 'stimky@gmail.com',
  });

  const doctor = await em.findOneOrFail(User, {
    email: 'mgood@med.hosp',
  });

  const appointment = em.create(Appointment, {
    patient,
    doctor,
    startsAt: testAptDate,
  });

  appointment.reminders.add(
    em.create(Reminder, {
      remindAt: appointment.getDefaultReminderTime(),
    })
  );

  await em
    .persistAndFlush(appointment)
    .then(() => res.status(201).send(appointment))
    .catch((err) => res.status(500).send(err));
}
