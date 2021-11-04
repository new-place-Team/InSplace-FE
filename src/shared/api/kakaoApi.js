import axios from 'axios';

/* Axios 인스턴스 설정 */
const kakoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/',
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
  },
});

export const getLocationAddress = latLon => {
  const URI = 'v2/local/geo/coord2regioncode.json?';
  return kakoApi.get(`${URI}x=${latLon.lon}&y=${latLon.lat}`);
};

export default kakoApi;
