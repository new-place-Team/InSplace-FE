/* eslint-disable */
/* global kakao */
import React, { useState } from 'react';
import { Container, Grid } from '../elements';
import { useSelector } from 'react-redux';
import { MapSlick } from '../components/map/MapSlick';
import { markerdata } from '../shared/MarkerData';
import MapCard from '../components/map/MapCard';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';

const MapContainer = () => {
  // SelectedCategory 데이터
  const tag = [{ tag: '두명' }, { tag: '혼성' }, { tag: '카페' }];

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
    <>
      <Header _back _content="상세보기" />
      <Container>
        <Grid>
          <Grid padding="0 24px">
            <SelectedCategory tag={tag} />
          </Grid>
          <MapSlick>
            {markerdata.map((el, idx) => {
              return <MapCard el={el} key={idx} />;
            })}
          </MapSlick>
          {/* API로 받아온 현재 좌표를 Map 컴포넌트에 props로 전달한다. */}
          <div style={{ overflowX: 'hidden' }}>
            <Map
              coordinate={currentCoordinate}
              width="100vw"
              height="80vh"
              markerdata={markerdata}
            />
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default MapContainer;
