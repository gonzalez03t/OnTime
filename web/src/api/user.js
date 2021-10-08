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
