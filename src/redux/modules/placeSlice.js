/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getMainListDB,
  getSearchConditionDB,
  getPlaceDetailDB,
  getCurrentCoordinateWEB,
  setFavoritesPostDB,
} from '../async/place';

/* init */
const initialState = {
  mainLists: null,
  weatherList: [],
  weatherStatus: null,
  /* 위치 정보 */
  location: null,
  /* 선택 카테고리 */
  selectedCategory: [],
  conditionPlaces: null,
  detailInfo: {},
  currentCoordinate: {},
  focusCoord: {},
  map: null,
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
    setFocusCoord: (state, { payload }) => {
      state.focusCoord = payload;
    },
    createMap: (state, { payload }) => {
      console.log(payload);
      state.map = payload;
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
      state.location = payload;
    },
    /* 좋아요 toggle 성공시 */
    [setFavoritesPostDB.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      /*  상세 좋아요 적용 */
      state.detailInfo.favoriteState = !state.detailInfo.favoriteState;
      state.detailInfo.favoriteState
        ? (state.detailInfo.favoriteCnt += 1)
        : (state.detailInfo.favoriteCnt -= 1);
      const { postId } = state.detailInfo;
      const { mainLists } = state;
      /* 메인 좋아요 적용 */
      for (const key in mainLists) {
        if (key && key !== 'weather') {
          const idx = mainLists[`${key}`].findIndex(v => v.postId === postId);
          if (idx > -1) {
            const target = mainLists[`${key}`][idx];
            target.favoriteState = !target.favoriteState;
          }
        }
      }
    },
  },
});

export const {
  getCurrentCoordinate,
  setSelectedCategory,
  setFocusCoord,
  createMap,
} = placeSlice.actions;

export default placeSlice;
