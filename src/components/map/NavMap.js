/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '../../elements';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SwiperMap from '../../components/place/SwiperMap';
import Map from '../../components/map/Map';
import Header from '../../components/common/Header';
import SelectedCategory from '../../components/place/SelectedCategory';
import { history } from '../../redux/configureStore';
import { useTranslation } from 'react-i18next';

const MapContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  /* 현재 URI Path 조회 */
  const { pathname } = history.location;
  /* Map에 보여줄 ListType */
  const pathArr = pathname.split('/');
  const type = pathArr[pathArr.length - 1];
  /* 장소 List */
  let placeList = null;
  const [latLonFocus, setLatLonFocus] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const onChageFocus = latLon => {
    setLatLonFocus({
      lat: latLon.lat,
      lon: latLon.lon,
    });
  };
  const onChnageFocusId = focusId => {
    setFocusId(focusId);
  };

  return (
    <>
      <MapDiv>
        <Header _back _content={t('placeMapPage.headerSubTitle')} />
        <Container padding="66px 0 0 0">
          <Map
            width="100%"
            height="100vh"
            allPlaces={placeList}
            latLonFocus={latLonFocus}
            _onChnageFocusId={onChnageFocusId}
          />
          {/* <SwiperWrap> */}
          <SwiperMap
            list={placeList}
            _onChageFocus={onChageFocus}
            focusId={focusId}
          />
          {/* </SwiperWrap> */}
        </Container>
      </MapDiv>
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
