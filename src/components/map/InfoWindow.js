/* eslint-disable */

export const setInfoWindow = (map, latitude, longitude) => {
  const { kakao } = window;
  const markerPosition = new kakao.maps.LatLng(latitude, longitude);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true,
  });
  const iwContent =
    '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  let iwRemoveable = true;
  // const iwPosition = new kakao.maps.LatLng(latitude, longitude);
  const infowindow = new kakao.maps.InfoWindow({
    // position: iwPosition,
    content: iwContent,
    removable: iwRemoveable,
  });
  kakao.maps.event.addListener(marker, 'click', function () {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow.open(map, marker);
  });
};
