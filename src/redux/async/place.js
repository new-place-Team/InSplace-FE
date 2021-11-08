/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
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
  reviewLikeCancel,
} from '../../shared/api/placeApi';
import { getLocationAddress } from '../../shared/api/kakaoApi';
import { getPosition } from '../../shared/utils';
import { history } from '../configureStore';

/* 메인 리스트 호출 */
export const getMainListDB = createAsyncThunk(
  'place/mainList',
  async (params, thunkAPI) => {
    try {
      const response = await getMainList(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 조건 검색 결과 호출 */
export const getSearchConditionDB = createAsyncThunk(
  'place/searchCondition',
  async (params, thunkAPI) => {
    try {
      const response = await getSearchCondition(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 장소 상세 조회 */
export const getPlaceDetailDB = createAsyncThunk(
  'place/detail',
  async (params, thunkAPI) => {
    try {
      const response = await getPlaceDetail(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

// 현재 위치 받아오기
export const getCurrentCoordinateWEB = createAsyncThunk(
  'place/currentCoordinate',
  async () => {
    try {
      /* 위도 경도 받기 */
      const res = await getPosition().then(position => position);
      if (res) {
        const latLon = {
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        };
        /* 위도경도 기반으로 현재주소 조회 */
        const addressRes = await getLocationAddress(latLon);
        const address = addressRes.data.documents[0].address_name;
        return { latLon, address };
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const setFavoritesPostDB = createAsyncThunk(
  'place/setFavorites',
  async (params, thunkAPI) => {
    try {
      let response;
      if (params.favoriteState) {
        response = await deleteFavoritesPost(params);
      } else {
        response = await postFavoritesPost(params);
      }
      if (response) {
        return params;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 최신순 받아오기 */
export const getReviewListDB = createAsyncThunk(
  'place/reviewList',
  async (params, thunkAPI) => {
    try {
      const response = await getReviewList(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
/* 리뷰 추천순 받아오기 */
export const getReviewLikesListDB = createAsyncThunk(
  'place/reviewLikesList',
  async (params, thunkAPI) => {
    try {
      const response = await getReviewLikesList(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
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
      if (response) {
        window.alert('리뷰가 등록되었습니다.');
        history.goBack();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

/* 리뷰 수정페이지 조회 */
export const getReviewEditDB = createAsyncThunk(
  'place/getReviewEdit',
  async (params, thunkAPI) => {
    try {
      const response = await getReviewEdit(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
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
      if (response) {
        return response.data;
      }
    } catch (err) {
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
      if (response) {
        window.alert('리뷰가 삭제되었습니다.');
      }
    } catch (err) {
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
      console.log('response = ', response);
    } catch (err) {
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
      console.log('response = ', response);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
