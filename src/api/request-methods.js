import axios from './http-service';

export function get(url, params) {
  return axios({
    url,
    params,
    method: 'get',
  });
}

export function post(url, params) {
  return axios({
    url,
    params,
    method: 'post',
  });
}

export function patch(url, params) {
  return axios({
    url,
    params,
    method: 'patch',
  });
}

export function upload(url, data) {
  return axios({
    url,
    data,
    method: 'post',
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
}

export default {
  get,
  post,
  patch,
  upload,
};
