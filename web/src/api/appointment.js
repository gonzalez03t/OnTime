import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/appointments';

export function getUserAppointments() {
  return axios.get(baseUrl).catch((err) => err.response);
}

export function createUserAppointment(employeeEmail, startsAt, wantsReminder) {
  return axios
    .post(baseUrl + '/new', { employeeEmail, startsAt, wantsReminder })
    .catch((err) => err.response);
}

export function getFilledSlots(dateRange, employeeId) {
  return axios
    .post(baseUrl + '/filled', { dateRange, employeeId })
    .catch((err) => err.response);
}

export function getAvailableSlots(employeeId, dateRange) {
  return axios
    .post(baseUrl + '/available', { dateRange, employeeId })
    .catch((err) => err.response);
}

export function rescheduleUserAppointment(appointmentId, newDateTime) {
  return axios
    .post(baseUrl + '/reschedule', { appointmentId, newDateTime })
    .catch((err) => err.response);
}

export function cancelUserAppointment(appointmentId) {
  return axios
    .post(baseUrl + '/cancel', { appointmentId })
    .catch((err) => err.response);
}
