import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/auth';

export function login(email, password) {
  return axios
    .post(baseUrl + '/login', { email, password })
    .catch((err) => err.response);
}

export function register(userDetails) {
  return axios
    .post(baseUrl + '/register', userDetails)
    .catch((err) => err.response);
}

export function registerUserAndCompany(userDetails, companyDetails) {
  return axios
    .post(baseUrl + '/register-company-owner', { userDetails, companyDetails })
    .catch((err) => err.response);
}

export function logout() {
  return axios.post(baseUrl + '/logout').catch((err) => err.response);
}

export function forgotPassword() {
  // TODO: might be more complicated than a single function
}

export function validateOtp(code) {
  return axios
    .post(baseUrl + '/otp/validate', { code })
    .catch((err) => err.response);
}

export function generateNewOtp() {
  return axios.post(baseUrl + '/otp/new').catch((err) => err.response);
}
