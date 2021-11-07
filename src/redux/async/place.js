/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  postFavoritesPost,
  deleteFavoritesPost,
  addReview,
} from '../../shared/api/placeApi';
import { getLocationAddress } from '../../shared/api/kakaoApi';
import { getPosition } from '../../shared/utils';

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
      console.log('타니', params);
      let response;
      if (params.favoriteState) {
        console.log('<<<<<<<<<<<<<');
        response = await deleteFavoritesPost(params);
      } else {
        console.log('>>>>>>>>>>>>>');
        response = await postFavoritesPost(params);
      }
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
    console.log('params == ', params);
    try {
      const formData = new FormData();
      formData.append('postId', 107);
      formData.append('reviewDesc', params.reviewDesc);
      formData.append('weather', params.weather.value);
      formData.append('weekdayYN', params.weekdayYN.value);
      formData.append('revisitYN', params.revisitYN.value);
      formData.append('reviewImages', params.reviewImages);

      console.log('params.reviewImages === ', params.reviewImages);

      // for (let i = 0; i < reviewImages.length; i++) {
      //   formData.append('reviewImages[]', reviewImages[i]);
      // }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await addReview(params, formData, config);

      console.log('res ??? ', res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
