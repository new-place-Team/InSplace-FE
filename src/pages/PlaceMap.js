/* eslint-disable */
/* global kakao */
import React from 'react';
import { Container, Grid } from '../elements';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SwiperMap from '../components/map/SwiperMap';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';
import { history } from '../redux/configureStore';

const MapContainer = () => {
  const { pathname } = history.location;
  const pathArr = pathname.split('/');
  const type = pathArr[pathArr.length - 1];
  console.log(type);
  let placeList = [];
  if (type === 'result') {
    const conditionPlaces = useSelector(state => state.place.conditionPlaces);
    placeList = [...conditionPlaces.inSideList, ...conditionPlaces.outSideList];
  }
  const currentCoord = useSelector(state => state.place.focusCoord);

  return (
    <>
      <Header _back _content="상세보기" />
      <Container padding="66px 0 0 0">
        <Grid>
          <Grid padding="0 24px">
            <SelectedCategory />
          </Grid>
          <SwiperMap list={placeList} />
          {/* 카카오지도 현재 위도 경도로 중심 찾기, 위도 경도로 리스트들 마커 찍기 */}
          <MapDiv>
            <Map
              width="100vw"
              height="80vh"
              allPlaces={placeList}
              currentCoord={currentCoord}
            />
          </MapDiv>
        </Grid>
      </Container>
    </>
  );
};

const MapDiv = styled.div`
  overflow-x: hidden;
`;

export default MapContainer;
