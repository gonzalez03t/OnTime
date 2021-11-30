import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';

export function getCompanies() {
  return axios.get(baseUrl).catch((err) => err.response);
}

export function getCompanyByName(name) {
  return axios.get(baseUrl + `?name=${name}`).catch((err) => err.response);
}

export function getPendingCompanies() {
  return axios.get(baseUrl + '/pending').catch((err) => err.response);
}

export function getCompanyByOwnerId(id) {
  return axios.get(baseUrl + `?ownerId=${id}`).catch((err) => err.response);
}

export function removeEmployee(employeeId) {
  return axios.post(baseUrl + '/employees/remove', { employeeId });
}

export function inviteEmployee(email) {
  return axios
    .post(baseUrl + `/employees/invite`, { email })
    .catch((err) => err.response);
}

export function registerCompany(name, address, phone) {
  return axios
    .post(baseUrl + `/new`, { name, address, phone })
    .catch((err) => err.response);
}

/**
 *
 * @param {string} id
 * @param {{ name: string | undefined, phone:string | undefined, profileS3Key: string | undefined, coverS3Key: string | undefined }} companyDetails
 */
export function updateCompanyProfile(id, companyDetails) {
  return axios
    .put(baseUrl + `/${id}/profile`, { companyDetails })
    .catch((err) => err.response);
}

/**
 *
 * @param {string} id
 * @param {{ maxBodyCount: number | undefined, employeeTitle:string | undefined, opensAt: string | undefined, closesAt: string | undefined }} companySettings
 */
export function updateCompanySettings(id, companySettings) {
  return axios
    .put(baseUrl + `/${id}/settings`, { companySettings })
    .catch((err) => err.response);
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
