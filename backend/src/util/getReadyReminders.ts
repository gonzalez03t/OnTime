import { em } from '..';
import { Reminder } from '../entities/Reminder';

/**
 * This utility function returns a list of reminders in the database which
 * are within approximately 30s behind and 1 minute ahead of current time.
 */
export default async function getReadyReminders() {
  let now = new Date();
  // 30s behind schedule
  now.setHours(now.getHours(), now.getMinutes() - 1, 30, 0);

  let offset = new Date();
  // 1 ahead
  offset.setHours(now.getHours(), now.getMinutes() + 1, 0, 0);

  return em
    .find(Reminder, {
      remindAt: { $gte: now, $lte: offset },
    })
    .then((reminders) => reminders)
    .catch((_err) => []);
}
