import { ReminderReturn } from '../../@types/types';
import { Appointment } from '../entities/Appointment';
import { Reminder } from '../entities/Reminder';

/**
 * This function will remove the sensative user information from each appointment
 * object in the appointments list. For BASE users, it will replace the client object
 * with the return from User.getDetails(). For ADMIN users, i.e. the employee, it will
 * replace the scheduledWith object with the return of User.getEmployeeDetails().
 *
 * @param appointments - the array of appointments to remove sensative information from
 * @returns Appointment[]
 */
export function redactAppointments(appointments: Appointment[]) {
  return appointments.map((appt) => {
    // remove sensative information from the return
    return {
      ...appt,
      client: appt.client.getDetails(),
      employee: appt.employee.getEmployeeDetails(),
    };
  });
}

/**
 * This function will remove sensative information from reminder objects, and also
 * convert them into ReminderReturn types to remove non-sensative but nonnecessary
 * information.
 *
 * @param reminders - the array of reminders, with the relations loaded in
 * @returns A restructured reminder object array (ReminderReturn)
 */
export function redactReminders(reminders: Reminder[]) {
  return reminders.map((reminder: Reminder) => {
    const { remindAt, appointment } = reminder;
    return {
      remindAt,
      appointment: {
        startsAt: appointment.startsAt,
        endsAt: appointment.getEndTime(),
        duration: appointment.duration,
        employee: appointment.employee.getEmployeeDetails(),
      },
    } as ReminderReturn;
  });
}
