import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/users';

export function viewer() {
  return axios.get(baseUrl + '/viewer').catch((err) => err.response);
}

// export function storeUserImage(imageSrc) {
//   return axios.
// }

export function updateUserProfile(userDetails) {
  return axios
    .put(baseUrl + '/settings/profile', { userDetails })
    .catch((err) => err.response);
}

export function updateUserPassword(password, code) {
  return axios
    .put(baseUrl + '/settings/password', {
      password,
      code,
      tokenType: 'CHANGE_PASSWORD',
    })
    .catch((err) => err.response);
}

export function updateUserNotificationPreference(newPreference) {
  return axios
    .put(baseUrl + '/settings/notifications', { newPreference })
    .catch((err) => err.response);
}

export function hasFutureAppointments() {
  return axios
    .get(baseUrl + '/hasFutureAppointments')
    .catch((err) => err.response);
}

// ADMIN ROUTES
/**
 *
 * @param {string} id userId
 * @param {'BASE' | 'EMPLOYEE' | 'COMPANY_OWNER' | 'ADMIN'} role
 */
export function changeUserRole(id, role) {
  return axios
    .put(baseUrl + `/${id}/role`, { role })
    .catch((err) => err.response);
}

/**
 *
 * @param {string} id userId
 * @param {'VERIFIED' | 'DENIED'} status
 */
export function verifyUserImage(id, status) {
  return axios
    .put(baseUrl + `/${id}/image/status`, { status })
    .catch((err) => err.response);
}
