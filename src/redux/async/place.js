/* eslint-disable no-unreachable */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { history } from '../configureStore';
import {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  postFavoritesPost,
  deleteFavoritesPost,
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
