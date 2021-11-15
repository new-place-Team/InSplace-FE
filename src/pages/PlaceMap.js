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

const MapContainer = () => {
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;
  const allPlaces = [...inSideList, ...outSideList];
  const currentCoord = useSelector(state => state.place.focusCoord);

  return (
    <>
      <Header _back _content="상세보기" />
      <Container padding="66px 0 0 0">
        <Grid>
          <Grid padding="0 24px">
            <SelectedCategory />
          </Grid>
          <SwiperMap list={allPlaces} />
          {/* 카카오지도 현재 위도 경도로 중심 찾기, 위도 경도로 리스트들 마커 찍기 */}
          <MapDiv>
            <Map
              width="100vw"
              height="80vh"
              allPlaces={allPlaces}
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
