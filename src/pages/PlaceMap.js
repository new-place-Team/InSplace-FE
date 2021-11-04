/* eslint-disable */
/* global kakao */
import React from 'react';
import { Container, Grid } from '../elements';
import { useSelector } from 'react-redux';
import { MapSlick } from '../components/map/MapSlick';

import MapCard from '../components/map/MapCard';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';

const MapContainer = () => {
  const selectedCategory = useSelector(state => state.place.selectedCategory);
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;
  const allPlaces = [...inSideList, ...outSideList];
  return (
    <>
      <Header _back _content="상세보기" />
      <Container>
        <Grid>
          <Grid padding="0 24px">
            <SelectedCategory tag={selectedCategory} />
          </Grid>
          <MapSlick>
            {allPlaces.map(el => {
              return <MapCard el={el} key={el.postId} />;
            })}
          </MapSlick>
          {/* 카카오지도 현재 위도 경도로 중심 찾기, 위도 경도로 리스트들 마커 찍기 */}
          <div style={{ overflowX: 'hidden' }}>
            <Map width="100vw" height="80vh" allPlaces={allPlaces} />
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default MapContainer;
