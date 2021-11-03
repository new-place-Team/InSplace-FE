/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
} from '../../shared/api/placeApi';
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
      console.log('response == ', response);
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
  async (params, thunkAPI) => {
    try {
      const response = await getPosition().then(position => position);
      console.log('<<<<<', response);
      if (response) {
        return response;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
