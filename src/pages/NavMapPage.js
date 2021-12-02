/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container } from '../elements';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SwiperMap from '../components/place/SwiperMap';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { useTranslation } from 'react-i18next';
import {
  getLocationPlaceDB,
  getCurrentCoordinateWEB,
} from '../redux/async/place';
import Spinner from '../components/common/Spinner';

const MapContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  /* 현재 위치 */
  const location = useSelector(state => state.place.location);
  /* 현재 위치 기준 5km 반경 장소 */
  const locationPlaceList = useSelector(state => state.place.locationPlaceList);
  const isLoading = useSelector(state => state.loaded.is_loaded);

  const [latLonFocus, setLatLonFocus] = useState(null);
  const [focusId, setFocusId] = useState(null);

  const onChageFocus = latLon => {
    const { lat, lon } = latLon;
    setLatLonFocus({ lat, lon });
  };
  const onChnageFocusId = focusId => {
    setFocusId(focusId);
  };

  useEffect(() => {
    /* 현재 위치 정보 없을 경우 */
    if (!location) {
      dispatch(getCurrentCoordinateWEB());
    }
    /* 현재 위치기반 5km 내 장소 조회 */
    if (location) {
      const { latLon } = location;
      dispatch(getLocationPlaceDB(latLon));
    }
  }, [location]);

  return (
    <>
      {isLoading && <Spinner />}
      <MapDiv>
        <Header _back _content={t('placeMapPage.headerSubTitle')} />
        <Container padding="66px 0 0 0">
          <Map
            width="100%"
            height="100vh"
            allPlaces={locationPlaceList && locationPlaceList}
            latLonFocus={latLonFocus}
            type="navMap"
            _onChnageFocusId={onChnageFocusId}
          />
          {/* <SwiperWrap> */}
          <SwiperMap
            list={locationPlaceList && locationPlaceList}
            _onChageFocus={onChageFocus}
            focusId={focusId}
            padding="0 0 33px 24px"
          />
          {/* </SwiperWrap> */}
        </Container>
      </MapDiv>
      <Navbar />
    </>
  );
};

const MapDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;
const MapCategoryWrap = styled.div`
  padding: 0 24px;
`;
const SwiperWrap = styled.div`
  position: relative;
  width: 100%;
`;

export default MapContainer;
