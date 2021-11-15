/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
import {
  getMainListDB,
  getSearchConditionDB,
  getPlaceDetailDB,
  getCurrentCoordinateWEB,
  setFavoritesPostDB,
  getReviewListDB,
  getReviewLikesListDB,
  setVisitedPostDB,
  getReviewEditDB,
  getSearchConditionListDB,
  getWeatherDB,
} from '../async/place';
import { getCategoryArrText } from '../../shared/transferText';

/* init */
const initialState = {
  mainLists: null,
  weatherList: [],
  weatherStatus: null,
  /* 위치 정보 */
  location: null,
  /* 선택 카테고리 */
  categoryParams: null,
  categoryList: null,
  conditionPlaces: null,
  detailInfo: {},
  currentCoordinate: {},
  placeList: null,
  placePagination: { page: 1, isNext: true },
  reviewList: null,
  reviewPagination: { page: 1, isNext: true },
  reviewLikesList: null,
  reviewLikesPagination: { page: 1, isNext: true },
  review: null,
  reviewlikeState: false,
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
      const objList = payload.replace('?', '').split('&');
      const categoryArr = ['gender', 'num', 'category'];
      const newCategoryList = categoryArr.map(item => {
        let typeValue = 0;
        objList.forEach(v => {
          const objArr = v.split('=');
          if (objArr[0] === item) {
            typeValue = Number(objArr[1]);
          }
        });
        return getCategoryArrText(item, typeValue);
      });
      state.categoryList = newCategoryList;
      state.categoryParams = payload;
    },
    setFocusCoord: (state, { payload }) => {
      payload;
      state.focusCoord = payload;
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
    addReviewList: (state, { payload }) => {
      const newReviewList = state.reviewList;
      if (newReviewList) {
        state.reviewList = [payload, ...newReviewList];
      }
    },
    updateReviewList: (state, { payload }) => {
      const newReviewList = state.reviewList;
      if (newReviewList) {
        const index = newReviewList.findIndex(item => {
          return item.reviewId === payload.reviewId;
        });
        const weather = [
          { selecteText: '맑음', value: 1 },
          { selecteText: '비', value: 2 },
          { selecteText: '눈', value: 3 },
          { selecteText: '흐림', value: 4 },
          { selecteText: '기억안남', value: 5 },
        ];
        const findWeather = weather.filter(
          item => item.value === payload.weather,
        );
        const newPayload = { ...payload, weather: findWeather[0].selecteText };
        state.reviewList[index] = newPayload;
      }
    },
    deleteReviewList: (state, { payload }) => {
      const newReviewList = state.reviewList;
      if (newReviewList) {
        state.reviewList = newReviewList.filter(
          item => item.reviewId !== payload.reviewId,
        );
      }
    },
    reviewLikesList: (state, { payload }) => {
      const newReviewList = state.reviewList;
      const newLikeReviewList = state.reviewLikesList;
      // 최신순 리뷰에 좋아요를 클릭했을 때
      if (!payload.reviewType) {
        if (newReviewList) {
          state.reviewList = newReviewList.map(item =>
            item.reviewId === payload.reviewId
              ? { ...item, likeState: 1, likeCnt: item.likeCnt + 1 }
              : item,
          );
        }
      } else if (newLikeReviewList) {
        state.reviewLikesList = newLikeReviewList.map(item =>
          item.reviewId === payload.reviewId
            ? { ...item, likeState: 1, likeCnt: item.likeCnt + 1 }
            : item,
        );
      }
    },
    reviewLikesCancelList: (state, { payload }) => {
      const newReviewList = state.reviewList;
      const newLikeReviewList = state.reviewLikesList;
      // 최신순 리뷰에 좋아요 취소를 클릭했을 때
      if (!payload.reviewType) {
        if (newReviewList) {
          state.reviewList = newReviewList.map(item =>
            item.reviewId === payload.reviewId
              ? { ...item, likeState: 0, likeCnt: item.likeCnt - 1 }
              : item,
          );
        }
      } else if (newLikeReviewList) {
        state.reviewLikesList = newLikeReviewList.map(item =>
          item.reviewId === payload.reviewId
            ? { ...item, likeState: 0, likeCnt: item.likeCnt - 1 }
            : item,
        );
      }
    },
  },

  extraReducers: {
    /* 날씨 정보 처리 완료 */
    [getWeatherDB.fulfilled]: (state, { payload }) => {
      state.weatherStatus = payload;
    },
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
    // 리뷰 최신순 조회
    [getReviewListDB.fulfilled]: (state, { payload }) => {
      if (state.reviewList) {
        state.reviewList = [...state.reviewList, ...payload.reviews];
        state.reviewPagination = {
          ...state.reviewPagination,
          page: payload.page,
          lastPage: payload.lastPage,
          isNext: payload.page !== payload.lastPage,
        };
      } else {
        // 최초 로드
        state.reviewList = payload.reviews;
      }
    },
    // 리뷰 추천순 조회
    [getReviewLikesListDB.fulfilled]: (state, { payload }) => {
      console.log(current(state.reviewList));
      if (state.reviewLikesList) {
        state.reviewLikesList = [...state.reviewLikesList, ...payload.reviews];
        state.reviewLikesPagination = {
          ...state.reviewLikesPagination,
          page: payload.page,
          lastPage: payload.lastPage,
          isNext: payload.page !== payload.lastPage,
        };
      } else {
        // 최초 로드
        state.reviewLikesList = payload.reviews;
      }
    },

    /* 리뷰 수정 조회 처리완료 */
    [getReviewEditDB.fulfilled]: (state, { payload }) => {
      state.review = payload.review;
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
  setConditionPlaces,
  addReviewList,
  updateReviewList,
  deleteReviewList,
  reviewLikesList,
  reviewLikesCancelList,
  setPlaceListInit,
} = placeSlice.actions;

export default placeSlice;
