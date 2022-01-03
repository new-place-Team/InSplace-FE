/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken, getLanguage } from '../utils';

/* Axios 인스턴스 설정 */
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

/* interceptor를 통한 header 설정 */
api.interceptors.request.use(async config => {
  config.headers['content-type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.Accept = '*/*';
  /* getToken이 로컬 스토리지에 없다면 null 값을 반환 */
  config.headers.authorization = await getToken();
  config.headers.language = await getLanguage();
  return config;
});

/* interceptor를 통한 response 설정 */
api.interceptors.response.use(
  async response => {
    // if(response){}
    return response;
  },
  async error => {
    console.log('통신에러 : ', error);
    return Promise.reject(error);
  },
);

export default api;
