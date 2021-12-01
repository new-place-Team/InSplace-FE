/* eslint-disable import/no-cycle */
import axios from 'axios';

/* Axios 인스턴스 설정 */
const kakoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/',
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
  },
});

export const getLocationAddress = (latLon, _params) => {
  let lang = 'ko';
  if (_params !== 'ko-KR' && _params !== 'ko') lang = 'en';

  const URI = 'v2/local/geo/coord2regioncode.json?';
  return kakoApi.get(`${URI}x=${latLon.lon}&y=${latLon.lat}&lang=${lang}`);
};

export default kakoApi;
