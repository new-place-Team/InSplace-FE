/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */

import React from 'react';
import { useDispatch } from 'react-redux';
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
export const mapscript = (mapDiv, allPlaces, lati, loni) => {
  const { kakao } = window;
  const options = {
    center: new kakao.maps.LatLng(
      allPlaces[0].postLocationY,
      allPlaces[0].postLocationX,
    ),
    level: 5,
  };
  // 지도를 생성합니다.
  const map = new kakao.maps.Map(mapDiv.current, options);

  function movew(lat, lon) {
    const moveLatLon = new kakao.maps.LatLng(lat, lon);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }
  movew(lati, loni);

  allPlaces.forEach(el => {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(el.postLocationY, el.postLocationX),
      title: el.title,
    });
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      console.log(el);
    });
  });
};

/* 현재위치 위도경도 가져오기 */
export const getPosition = options => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
