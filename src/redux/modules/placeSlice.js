/* eslint-disable no-alert */
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
  getReviewListDB,
  getReviewLikesListDB,
  reviewLikeDB,
  setVisitedPostDB,
  getReviewEditDB,
  getSearchConditionListDB,
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
  placeList: null,
  placePagination: { page: 1, isNext: true },
  reviewList: [],
  reivewLikesList: [],
  review: null,
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
    setPlaceListInit: state => {
      state.placeList = null;
      state.placePagination = { page: 1, isNext: true };
    },
    /* 선택 결과 장소 , 검새 결과 장소 좋아요 */
    setConditionPlaces: (state, { payload }) => {
      const { postId } = payload;
      const { conditionPlaces, placeList } = state;
      if (conditionPlaces) {
        for (const key in conditionPlaces) {
          if (key) {
            const idx = conditionPlaces[`${key}`].findIndex(
              v => v.postId === postId,
            );
            if (idx > -1) {
              const target = conditionPlaces[`${key}`][idx];
              target.favoriteState = !target.favoriteState;
              target.favoriteState
                ? (target.favoriteCnt += 1)
                : (target.favoriteCnt -= 1);
            }
          }
        }
      }
      if (placeList) {
        const idx = placeList.findIndex(v => v.postId === postId);
        const target = placeList[idx];
        target.favoriteState = !target.favoriteState;
        target.favoriteState
          ? (target.favoriteCnt += 1)
          : (target.favoriteCnt -= 1);
      }
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
    /* 리뷰 최신순 조회 처리 완료 */
    [getReviewListDB.fulfilled]: (state, { payload }) => {
      state.reviewList = payload.reviews;
    },
    /* 리뷰 추천순 조회 처리 완료 */
    [getReviewLikesListDB.fulfilled]: (state, { payload }) => {
      state.reivewLikesList = payload.reviews;
    },
    /* 리뷰 수정 조회 처리완료 */
    [getReviewEditDB.fulfilled]: (state, { payload }) => {
      state.review = payload.review;
    },
    /* 리뷰 수정 처리완료 */
    // [updateReviewDB.fulfilled]: (state, { payload }) => {
    //   state.review = payload.post;
    // },
    /* 리뷰 좋아요 처리 실패 */
    [reviewLikeDB.rejected]: (state, { payload }) => {
      window.alert(payload.errMsg);
    },
    // 현재좌표 받아오기
    [getCurrentCoordinateWEB.fulfilled]: (state, { payload }) => {
      state.location = payload;
    },
    /* 좋아요 toggle 성공시 */
    [setFavoritesPostDB.fulfilled]: (state, { payload }) => {
      const { postId } = payload;
      // 상세 좋아요 적용
      if (state.detailInfo) {
        state.detailInfo.favoriteState = !state.detailInfo.favoriteState;
        state.detailInfo.favoriteState
          ? (state.detailInfo.favoriteCnt += 1)
          : (state.detailInfo.favoriteCnt -= 1);
      }
      // 메인 좋아요 적용
      const { mainLists } = state;
      if (mainLists) {
        for (const key in mainLists) {
          if (key && key !== 'weather') {
            const idx = mainLists[`${key}`].findIndex(v => v.postId === postId);
            if (idx > -1) {
              const target = mainLists[`${key}`][idx];
              target.favoriteState = !target.favoriteState;
              target.favoriteState
                ? (target.favoriteCnt += 1)
                : (target.favoriteCnt -= 1);
            }
          }
        }
      }
    },
    /* 가본장소 추가 or 삭제 */
    [setVisitedPostDB.fulfilled]: state => {
      state.detailInfo.visitedStatus = !state.detailInfo.visitedStatus;
    },
    /* 가본장소 추가 실패 */
    [setVisitedPostDB.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
    },
    /* list 페이지 조회 */
    [getSearchConditionListDB.fulfilled]: (state, { payload }) => {
      if (state.placeList) {
        // 더보기 추가
        state.placeList = [...state.placeList, ...payload.posts];
        state.placePagination = {
          ...state.placePagination,
          page: payload.page,
          lastPage: payload.lastPage,
          isNext: payload.page !== payload.lastPage,
        };
      } else {
        // 최초 로드
        state.placeList = payload.posts;
      }
    },
  },
});

export const {
  getCurrentCoordinate,
  setSelectedCategory,
  setFocusCoord,
  createMap,
  setConditionPlaces,
  setPlaceListInit,
} = placeSlice.actions;

export default placeSlice;
