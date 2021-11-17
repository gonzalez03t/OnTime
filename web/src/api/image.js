import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/s3/images';

/**
 * @param {string} key string key for new object in S3 bucket
 * @param {Buffer} fileContents Buffer of image file contents
 * @param {string} type mime file type
 */
export function uploadImage(key, fileContents, type) {
  return axios
    .post(baseUrl, { key, fileContents, type })
    .catch((err) => err.response);
}

/**
 * @param {string} key string key of object in S3 bucket
 */
export function deleteImage(key) {
  return axios.delete(baseUrl + `/${key}`).catch((err) => err.response);
}

// not using axios, the <img> will make the GET request
export function getImageUrl(key) {
  return `${baseUrl}/${key}`;
}
