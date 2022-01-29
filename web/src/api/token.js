import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/tokens';

export function createChangePasswordToken() {
  return axios.post(baseUrl + '/password/change').catch((err) => err.response);
}

export function createForgotPasswordToken(email, phone) {
  return axios
    .post(baseUrl + '/password/forgot', { email, phone })
    .catch((err) => err.response);
}
