import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/tokens';

export function createChangePasswordToken() {
  return axios.post(baseUrl + '/password/change').catch((err) => err.response);
}

export function createForgotPasswordToken() {
  return axios.post(baseUrl + '/password/forgot').catch((err) => err.response);
}
