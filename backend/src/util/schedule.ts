import { CronJob } from 'cron';
import getReadyReminders from './getReadyReminders';

const scheduler = {
  /**
   * This is the main scheduling function. On invoke, it will start an indefinite
   * interval run every minute, which calls the getReadyReminders function to get
   * all reminders that are ready to be sent SMS messages.
   */
  start: function () {
    new CronJob(
      '00 * * * * *', // run every minute
      async function () {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Checking for ready reminders...');
        }

        const reminders = await getReadyReminders();

        reminders.forEach((reminder) => {
          reminder.sendNotification();
        });
      },
      null,
      true,
      ''
    );
  },
};

export default scheduler;
