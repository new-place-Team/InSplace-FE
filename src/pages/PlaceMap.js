/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '../elements';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SwiperMap from '../components/map/SwiperMap';
import Map from '../components/map/Map';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';
import {
  getSearchConditionDB,
  getSearchConditionListDB,
} from '../redux/async/place';
import { history } from '../redux/configureStore';

const MapContainer = () => {
  const dispatch = useDispatch();
  /* 현재 URI Path 조회 */
  const { pathname } = history.location;
  /* Map에 보여줄 ListType */
  const pathArr = pathname.split('/');
  const type = pathArr[pathArr.length - 1];
  /* 장소 List */
  let placeList = null;
  if (type === 'result') {
    // 검색[실내, 실외] 결과 리스트
    const conditionPlaces = useSelector(state => state.place.conditionPlaces);
    placeList = conditionPlaces
      ? [...conditionPlaces.insidePlaces, ...conditionPlaces.outSidePlaces]
      : null;
  } else {
    // 실외List or 실내List or 장소검색List
    placeList = useSelector(state => state.place.placeList);
  }
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

  useEffect(() => {
    const params = history.location.search;
    if (!placeList) {
      if (type === 'result') {
        dispatch(getSearchConditionDB(params));
      } else {
        const qureryString = `search/pages/1/${type}${params}`;
        dispatch(getSearchConditionListDB(qureryString));
      }
    }
  }, []);

  return (
    <>
      <Header _back _content="상세보기" _language />
      <Container padding="66px 0 0 0">
        <button type="button">버튼 클릭!!</button>
        <Grid padding="0 24px">
          <SelectedCategory />
        </Grid>
        <MapDiv>
          <MapCategoryWrap padding="0 24px">
            <SelectedCategory />
          </MapCategoryWrap>
          <Map
            width="100%"
            height="100vh"
            allPlaces={placeList}
            latLonFocus={latLonFocus}
            _onChnageFocusId={onChnageFocusId}
          />

          {/* SwiperList Card */}
          <SwiperWrap>
            <SwiperMap list={placeList} _onChageFocus={onChageFocus} />
          </SwiperWrap>
        </MapDiv>
      </Container>
    </>
  );
};

const MapDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
const MapCategoryWrap = styled.div`
  border: 2px solid blue;
`;
const SwiperWrap = styled.div`
  position: relative;
  width: 100%;
`;

export default MapContainer;
