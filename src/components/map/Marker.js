export const setMarker = (map, latitude, longitude) => {
  const { kakao } = window;
  const markerPosition = new kakao.maps.LatLng(latitude, longitude);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true,
  });
  marker.setMap(map);
};
