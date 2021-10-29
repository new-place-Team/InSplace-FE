import axios from 'axios';
import { getToken } from '../utils';

/* Axios 인스턴스 설정 */
const api = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'http://52.79.162.82',
});

/* interceptor를 통한 header 설정 */

/* interceptor를 통한 response 설정 */

export default api;
