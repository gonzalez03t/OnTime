import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';

export function getCompanies() {
  return axios.get(baseUrl).catch((err) => err.response);
}

export function getCompanyByName(name) {
  return axios.get(baseUrl + `?name=${name}`).catch((err) => err.response);
}

export function getCompanyByOwnerId(id) {
  return axios.get(baseUrl + `?ownerId=${id}`).catch((err) => err.response);
}

// ADMIN FUNCTIONS
/**
 *
 * @param {string} id companyId
 * @param {'VERIFIED' | 'DENIED'} status
 */
export function verifyCompany(id, status) {
  return axios
    .put(baseUrl + `/${id}/status`, { status })
    .catch((err) => err.response);
}

/**
 *
 * @param {string} id companyId
 * @param {'VERIFIED' | 'DENIED'} status
 */
export function verifyCompanyImage(id, status) {
  return axios
    .put(baseUrl + `/${id}/image/status`, { status })
    .catch((err) => err.response);
}
