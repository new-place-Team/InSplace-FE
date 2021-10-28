/* eslint-disable */
/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import MapCard from '../components/MapCard';
import SearchBar from '../components/SearchBar';
import SelectedCategory from '../components/SelectedCategory';

const { kakao } = window;

const MapContainer = () => {
  const [currentCoordinate, setCurrentCoordinate] = useState({});

  // 지도를 생성할때 필요한 기본 옵션
  const options = {
    // 1. 지도의 중심좌표
    center: new kakao.maps.LatLng(
      currentCoordinate.latitude,
      currentCoordinate.longitude,
    ),
    level: 1, // 2. 지도의 확대래벨
  };
  // GeolocationPosition 객체를 유일한 매개변수로 받는 콜백 함수.
  const getCoordinate = pos => {
    const { latitude, longitude } = pos.coords;
    const coordinate = {
      latitude,
      longitude,
    };
    return setCurrentCoordinate(coordinate);
  };

  // 현재위치 받아오기
  window.navigator.geolocation.getCurrentPosition(pos => {
    getCoordinate(pos);
  });

  useEffect(() => {
    const container = document.getElementById('myMap');
    const map = new kakao.maps.Map(container, options);

    // 마커 띄우기
    const markerPosition = new kakao.maps.LatLng(
      currentCoordinate.latitude,
      currentCoordinate.longitude,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 인포 윈도우 띄우기
    var iwContent =
        '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);
  }, [currentCoordinate]);

  return (
    <Grid width="100%" height="100vh">
      <SearchBar />
      <SelectedCategory />
      {/* <MapCard /> */}
      <MapContain id="myMap" />
    </Grid>
  );
};
// https://m.map.kakao.com/
const MapContain = styled.div`
  width: 100vw;
  height: 80vh;
  /* z-index: -1; */
  /* position: fixed; */
  /* bottom: 0; */
`;

export default MapContainer;
