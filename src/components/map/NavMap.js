/* eslint-disable */
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Container, Grid } from '../../elements';
=======
import { Container } from '../../elements';
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SwiperMap from '../../components/place/SwiperMap';
import Map from '../../components/map/Map';
import Header from '../../components/common/Header';
<<<<<<< HEAD
=======
import Navbar from '../../components/common/Navbar';
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
import { useTranslation } from 'react-i18next';
import { getLocationPlaceDB } from '../../redux/async/place';

const MapContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
<<<<<<< HEAD
  const location = useSelector(state => state.place.location);
  console.log('location', location);
  /* 장소 List */
  let placeList = null;

  const [latLonFocus, setLatLonFocus] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const onChageFocus = latLon => {
    setLatLonFocus({
      lat: latLon.lat,
      lon: latLon.lon,
    });
=======
  /* 현재 위치 */
  const location = useSelector(state => state.place.location);
  /* 현재 위치 기준 5km 반경 장소 */
  const locationPlaceList = useSelector(state => state.place.locationPlaceList);

  const [latLonFocus, setLatLonFocus] = useState(null);
  const [focusId, setFocusId] = useState(null);

  const onChageFocus = latLon => {
    const { lat, lon } = latLon;
    setLatLonFocus({ lat, lon });
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
  };
  const onChnageFocusId = focusId => {
    setFocusId(focusId);
  };

  useEffect(() => {
    if (location) {
      const { latLon } = location;
      dispatch(getLocationPlaceDB(latLon));
    }
  }, []);

  return (
    <>
      <MapDiv>
        <Header _back _content={t('placeMapPage.headerSubTitle')} />
        <Container padding="66px 0 0 0">
          <Map
            width="100%"
            height="100vh"
<<<<<<< HEAD
            allPlaces={placeList}
            latLonFocus={latLonFocus}
=======
            allPlaces={locationPlaceList && locationPlaceList}
            latLonFocus={latLonFocus}
            type="navMap"
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
            _onChnageFocusId={onChnageFocusId}
          />
          {/* <SwiperWrap> */}
          <SwiperMap
<<<<<<< HEAD
            list={placeList}
=======
            list={locationPlaceList && locationPlaceList}
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
            _onChageFocus={onChageFocus}
            focusId={focusId}
          />
          {/* </SwiperWrap> */}
        </Container>
      </MapDiv>
<<<<<<< HEAD
=======
      <Navbar />
>>>>>>> 2fb94352eaf5138ccb337afa93be8ca3f6579fab
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
