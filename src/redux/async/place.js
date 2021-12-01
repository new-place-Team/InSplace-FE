/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWeatherInfo,
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  postFavoritesPost,
  deleteFavoritesPost,
  addReview,
  updateReview,
  getReviewEdit,
  getReviewList,
  getReviewLikesList,
  deleteReview,
  reviewLike,
  postVisitedPost,
  deleteVisitedPost,
  reviewLikeCancel,
  getSearchConditionList,
  reviewReport,
  getMainMap,
} from '../../shared/api/placeApi';
import { getLocationAddress } from '../../shared/api/kakaoApi';
import { getPosition } from '../../shared/utils';

import {
  addUserLikePost,
  deleteUserLikePost,
  addUserVisitedPost,
  deleteUserVisitedPost,
} from '../modules/userSlice';

import {
  setConditionPlaces,
  deleteReviewList,
  updateReviewList,
  reviewLikesList,
  reviewLikesCancelList,
  setSelectedCategory,
  resetReviewLikeList,
  resetReviewList,
  resetReviewPagination,
} from '../modules/placeSlice';
import { getLoaded } from '../modules/loadedSlice';
import {
  setCommonModalOn,
  setErrorModalOn,
  setMoreModalOff,
  setReportModalOn,
} from '../modules/commonSlice';

export const getWeatherDB = createAsyncThunk(
  'place/weatherInfo',
  async thunkAPI => {
    try {
      const response = await getWeatherInfo();
      if (response) {
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 메인 리스트 호출 */
export const getMainListDB = createAsyncThunk(
  'place/mainList',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(getLoaded(true));
    try {
      const response = await getMainList();
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 조건 검색 결과 호출 */
export const getSearchConditionDB = createAsyncThunk(
  'place/searchCondition',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(getLoaded(true));
    try {
      const response = await getSearchCondition(params);
      if (response) {
        thunkAPI.dispatch(setSelectedCategory(params));
        thunkAPI.dispatch(getLoaded(false));
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 장소 상세 조회 */
export const getPlaceDetailDB = createAsyncThunk(
  'place/detail',
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getPlaceDetail(params);
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

// 현재 위치 받아오기
export const getCurrentCoordinateWEB = createAsyncThunk(
  'place/currentCoordinate',
  async (_params, thunkAPI) => {
    try {
      /* 위도 경도 받기 */
      thunkAPI.dispatch(getLoaded(true));
      const res = await getPosition().then(position => position);
      if (res) {
        const latLon = {
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        };
        /* 위도경도 기반으로 현재주소 조회 */
        const addressRes = await getLocationAddress(latLon, _params);
        const address = addressRes.data.documents[0].address_name;
        thunkAPI.dispatch(getLoaded(false));
        return { latLon, address };
      }
    } catch (err) {
      console.log(err.response);
      thunkAPI.dispatch(getLoaded(false));
      return thunkAPI.rejectWithValue(err);
    }
  },
);
/* 좋아요 추가 or 삭제 */
export const setFavoritesPostDB = createAsyncThunk(
  'place/setFavorites',
  async (params, thunkAPI) => {
    try {
      let response;
      if (params.favoriteState) {
        response = await deleteFavoritesPost(params);
        thunkAPI.dispatch(deleteUserLikePost(params));
      } else {
        response = await postFavoritesPost(params);
        thunkAPI.dispatch(addUserLikePost(params));
      }
      if (response) {
        thunkAPI.dispatch(setConditionPlaces(params));
        return params;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);
/* 가본곳 추가 or 삭제 */
export const setVisitedPostDB = createAsyncThunk(
  'place/setVistiedPost',
  async (params, thunkAPI) => {
    try {
      let response;
      if (params.visitedStatus) {
        response = await deleteVisitedPost(params);
        thunkAPI.dispatch(deleteUserVisitedPost(params));
      } else {
        response = await postVisitedPost(params);
        thunkAPI.dispatch(addUserVisitedPost(params));
      }
      if (response) {
        return response;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 장소(실내 or 실외) 리스트, 검색 장소 리스트 조회 */
export const getSearchConditionListDB = createAsyncThunk(
  'place/placeSearchList',
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getSearchConditionList(params);
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 최신순 받아오기 */
export const getReviewListDB = createAsyncThunk(
  'place/reviewList',
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getReviewList(params);
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        thunkAPI.dispatch(resetReviewLikeList);
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 추천순 받아오기 */
export const getReviewLikesListDB = createAsyncThunk(
  'place/reviewLikesList',
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getReviewLikesList(params);
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        thunkAPI.dispatch(resetReviewList);
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 등록 */
export const addReviewDB = createAsyncThunk(
  'place/addReview',
  async (params, thunkAPI) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await addReview(params, config);
      thunkAPI.dispatch(resetReviewPagination());
      if (response) {
        const modalParams = {
          title: params.msg,
          goPage: 'back',
        };
        thunkAPI.dispatch(setCommonModalOn(modalParams));
        // 리뷰 페이지 번호가 변경되었을 경우를 대비해서 페이지 초기화
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 수정페이지 조회, 추후 삭제할 수 있음. */
export const getReviewEditDB = createAsyncThunk(
  'place/getReviewEdit',
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getReviewEdit(params);
      if (response) {
        thunkAPI.dispatch(getLoaded(false));
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 수정 */
export const updateReviewDB = createAsyncThunk(
  'place/updateReview',
  async (params, thunkAPI) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await updateReview(params, config);
      thunkAPI.dispatch(resetReviewPagination());
      const modalParams = {
        title: params.msg,
        goPage: 'back',
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      thunkAPI.dispatch(updateReviewList(response.data.post));
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);
/* 리뷰 삭제 */
export const deleteReviewDB = createAsyncThunk(
  'place/deleteReview',
  async (params, thunkAPI) => {
    try {
      const response = await deleteReview(params);
      thunkAPI.dispatch(deleteReviewList(params));
      if (response) {
        return params;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 좋아요 */
export const reviewLikeDB = createAsyncThunk(
  'place/reviewLike',
  async (params, thunkAPI) => {
    try {
      const response = await reviewLike(params);
      thunkAPI.dispatch(reviewLikesList(params));
      if (response) {
        return params;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setErrorModalOn(modalParams));
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
/* 리뷰 좋아요 취소 */
export const reviewLikeCancelDB = createAsyncThunk(
  'place/reviewLikeCancel',
  async (params, thunkAPI) => {
    try {
      const response = await reviewLikeCancel(params);
      thunkAPI.dispatch(reviewLikesCancelList(params));
      if (response) {
        return params;
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setErrorModalOn(modalParams));
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
export const reviewReportDB = createAsyncThunk(
  'place/reviewReport',
  async (params, thunkAPI) => {
    try {
      const response = await reviewReport(params);
      thunkAPI.dispatch(setMoreModalOff());
      if (response) {
        const modalParams = {
          title: '신고가 접수되었습니다.',
        };
        return thunkAPI.dispatch(setReportModalOn(modalParams));
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getLocationPlaceDB = createAsyncThunk(
  'place/locationPlace',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(getLoaded(true));
    const response = await getMainMap(params);
    if (response) {
      thunkAPI.dispatch(getLoaded(false));
      return response;
    }
  },
);
