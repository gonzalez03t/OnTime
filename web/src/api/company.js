import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';

export function getCompanyByName(name) {
  return axios.get(baseUrl + `/${name}`).catch((err) => err.response);
}
