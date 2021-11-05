/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
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

// 지도 생성 + 마커 생성 (markerdata가 [] 형식데이터)
export const mapscript = (mapDiv, allPlaces) => {
  const { kakao } = window;
  const options = {
    center: new kakao.maps.LatLng(
      allPlaces[0].postLocationY,
      allPlaces[0].postLocationX,
    ),
    level: 5,
  };
  const map = new kakao.maps.Map(mapDiv.current, options);
  allPlaces.forEach(el => {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(el.postLocationY, el.postLocationX),
      title: el.title,
    });
  });
};

/* 현재위치 위도경도 가져오기 */
export const getPosition = options => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
