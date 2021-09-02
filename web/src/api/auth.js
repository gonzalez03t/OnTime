import axios from 'axios';

const baseUrl = process.env.BACKEND_URL + '/api/auth';

export function login(email, password) {
  return axios.post(baseUrl + '/login', { email, password });
}

export function register(userDetails) {
  return axios.post(baseUrl + '/register', userDetails);
}

export function logout() {
  return axios.post(baseUrl + '/logout');
}

export function forgotPassword() {
  // TODO: might be more complicated than a single function
}
