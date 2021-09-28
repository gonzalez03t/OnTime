import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/users';

export function viewer() {
  return axios.get(baseUrl + '/viewer').catch((err) => err.response);
}
