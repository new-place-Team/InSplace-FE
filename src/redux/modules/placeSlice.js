/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getMainListDB,
  getSearchConditionDB,
  getPlaceDetailDB,
  getCurrentCoordinateWEB,
} from '../async/place';

/* init */
const initialState = {
  mainLists: null,
  weatherList: [],
  weatherStatus: null,
  /* 선택 카테고리 */
  selectedCategory: [],
  conditionPlaces: null,
  detailInfo: {},
  currentCoordinate: {},
};

const placeSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    mainLists: (state, { payload }) => {
      state.mainLists = payload;
      state.weatherList = payload.weatherPlace;
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
  extraReducers: {
    /* Fulfilled(이행) 처리 완료 */
    [getMainListDB.fulfilled]: (state, { payload }) => {
      state.mainLists = payload;
      state.weatherStatus = payload.weather;
    },
    /* rejected 처리 실패 */
    [getMainListDB.rejected]: (state, { payload }) => {
      console.log(payload);
    },
    /* 타입별 검색 처리 완료 */
    [getSearchConditionDB.fulfilled]: (state, { payload }) => {
      state.conditionPlaces = payload;
    },
    /* 장소 상세 조회 처리 완료 */
    [getPlaceDetailDB.fulfilled]: (state, { payload }) => {
      state.detailInfo = payload;
    },
    // 현재좌표 받아오기
    [getCurrentCoordinateWEB.fulfilled]: (state, { payload }) => {
      const coordinate = {
        latitude: payload.coords.latitude,
        longitude: payload.coords.longitude,
      };
      state.currentCoordinate = coordinate;
    },
  },
});

export const { getCurrentCoordinate, setSelectedCategory } = placeSlice.actions;

export default placeSlice;
