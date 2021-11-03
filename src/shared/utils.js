/* 개발모드에서 logger */
export const logger = msg => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(msg);
};

/* localStorage에서 토큰 가져오기 */
export const getToken = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('USER_TOKEN');
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};

// 지도만 생성, mapDiv인자는 useRef로 연결한 요소
export const mapMaker = (latitude, longitude, mapDiv) => {
  const { kakao } = window;
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };
  const map = new kakao.maps.Map(mapDiv.current, options);
};

// 지도 생성 + 마커 생성 (markerdata가 [] 형식데이터)
export const mapscript = (latitude, longitude, mapDiv, markerdata) => {
  const { kakao } = window;
  const options = {
    // 지도 옵션중에 위도 경도를 받아옴.
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };
  const map = new kakao.maps.Map(mapDiv.current, options);
  markerdata.forEach(el => {
    // 마커를 생성합니다
    // console.log(el);
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(el.lat, el.lng),
      title: el.title,
    });
  });
};

// 위도,경도 추출하는 함수
// export const getCoordinate = pos => {
//   const { latitude, longitude } = pos.coords;
//   const coordinate = {
//     latitude,
//     longitude,
//   };
//   console.log(coordinate);
//   return coordinate;
// };

// 현재 위치를 받아오는 함수
// export const getCurrentLoaction = () => {
//   // eslint-disable-next-line no-return-await
//   window.navigator.geolocation.getCurrentPosition(pos => {
//     return getCoordinate(pos);
//   });
// };

// 현재 좌표를 받는다.
export const getCoordinate = () => {
  window.navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const coordinate = {
      latitude,
      longitude,
    };
    return coordinate;
  });
};
