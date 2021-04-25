import { ReminderReturn } from '../../@types/types';
import { Appointment } from '../entities/Appointment';
import { Reminder } from '../entities/Reminder';

/**
 * This function will remove the sensative user information from each appointment
 * object in the appointments list. For BASE users, it will replace the patient object
 * with the return from User.getDetails(). For ADMIN users, i.e. the doctor, it will
 * replace the scheduledWith object with the return of User.getDoctorDetails().
 *
 * @param appointments - the array of appointments to remove sensative information from
 * @returns Appointment[]
 */
export function redactAppointments(appointments: Appointment[]) {
  return appointments.map((appt) => {
    // remove sensative information from the return
    return {
      ...appt,
      patient: appt.patient.getDetails(),
      doctor: appt.doctor.getDoctorDetails(),
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
        doctor: appointment.doctor.getDoctorDetails(),
      },
    } as ReminderReturn;
  });
}
