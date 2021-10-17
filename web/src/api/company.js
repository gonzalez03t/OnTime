import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';

export function getCompanyByName(name) {
  return axios.get(baseUrl + `/${name}`).catch((err) => err.response);
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
