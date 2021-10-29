/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from '../utils';

/* Axios 인스턴스 설정 */
const api = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'http://52.79.162.82',
});

/* interceptor를 통한 header 설정 */
api.interceptors.request.use(async config => {
  config.headers['content-type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.Accept = '*/*';
  /* getToken이 로컬 스토리지에 없다면 null 값을 반환 */
  config.headers.authorization = await getToken();
  return config;
});

/* interceptor를 통한 response 설정 */
api.interceptors.response.use(
  async response => {
    /* TODO 2021-10-30 - 추후 작업 */
    // if(response){}
    return response;
  },
  async error => {
    /* TODO 2021-10-30 - 추후 작업 */
    console.log('통신에러 : ', error);
    return Promise.reject(error);
  },
);

export default api;
