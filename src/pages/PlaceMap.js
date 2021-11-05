/* eslint-disable */
/* global kakao */
import React from 'react';
import { Container, Grid } from '../elements';
import { useSelector } from 'react-redux';

import SwiperMap from '../components/map/SwiperMap';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';

const MapContainer = () => {
  const selectedCategory = useSelector(state => state.place.selectedCategory);
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;
  const allPlaces = [...inSideList, ...outSideList];
  const currentCoord = useSelector(state => state.place.focusCoord);

  return (
    <>
      <Header _back _content="상세보기" />
      <Container>
        <Grid>
          <Grid padding="0 24px">
            <SelectedCategory tag={selectedCategory} />
          </Grid>
          <SwiperMap list={allPlaces} />
          {/* 카카오지도 현재 위도 경도로 중심 찾기, 위도 경도로 리스트들 마커 찍기 */}
          <div style={{ overflowX: 'hidden' }}>
            <Map
              width="100vw"
              height="80vh"
              allPlaces={allPlaces}
              currentCoord={currentCoord}
            />
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default MapContainer;
