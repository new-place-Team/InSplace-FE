/* eslint-disable */
/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import MapCard from '../components/MapCard';
import SearchBar from '../components/SearchBar';
import SelectedCategory from '../components/SelectedCategory';
import Map from '../components/Map';

const MapContainer = () => {
  // 지도 상세 페이지에서는 현재 위치를 받아와서 자식 컴포넌트인 MAP에 위도,경도 정보를 보내준다.
  const [currentCoordinate, setCurrentCoordinate] = useState({});

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

  //현재 위치 좌표
  console.log('현재 내 위치좌표', currentCoordinate);

  return (
    <Grid width="100%" height="100vh">
      <SearchBar />
      <SelectedCategory />
      <MapCard />
      {/* API로 받아온 현재 좌표를 Map 컴포넌트에 props로 전달한다. */}
      <Map coordinate={currentCoordinate} />
    </Grid>
  );
};

export default MapContainer;
