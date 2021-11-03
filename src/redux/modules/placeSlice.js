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
  conditionPlaces: {},
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
  },
  extraReducers: {
    /* Fulfilled(이행) 처리 완료 */
    [getMainListDB.fulfilled]: (state, { payload }) => {
      state.mainLists = payload;
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
    [getCurrentCoordinateWEB.fulfilled]: (state, { payload }) => {
      console.log('리듀서 fullfilled', payload);
    },
    [getCurrentCoordinateWEB.pending]: (state, { payload }) => {
      console.log('web panding', payload);
    },
    /* rejected 처리 실패 */
    [getCurrentCoordinateWEB.rejected]: (state, { payload }) => {
      console.log('reject', payload);
    },
  },
});

export const { getCurrentCoordinate } = placeSlice.actions;

export default placeSlice;
