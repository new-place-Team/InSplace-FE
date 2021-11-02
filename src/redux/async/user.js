import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addUser,
  logIn,
  logInCheck,
  unRegister,
} from '../../shared/api/userApi';

// 회원등록
export const addUserDB = createAsyncThunk(
  'user/addUser',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    try {
      const response = await addUser(data);
      if (response) {
        console.log(response);
        return response;
      }
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);

// 로그인
export const logInDB = createAsyncThunk(
  'user/logIn',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    try {
      const response = await logIn(data);
      if (response) {
        // eslint-disable-next-line prefer-destructuring
        const USER_TOKEN = response.data.token;
        window.localStorage.setItem('USER_TOKEN', USER_TOKEN);
        const userInfo = {
          email: response.data.email,
          nickname: response.data.nickname,
          userImage: response.data.userImage,
          mbti: response.data.mbti,
        };
        return userInfo;
      }
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);

// 로그인 체크
export const logInCheckDB = createAsyncThunk(
  'user/logInCheck',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    try {
      const response = await logInCheck();
      return response.data;
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);

// 회원탈퇴
export const unRegisterDB = createAsyncThunk(
  'user/unRegister',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    // eslint-disable-next-line prefer-destructuring
    const userId = thunkAPI.getState().user.userInfo.userId;
    try {
      const response = await unRegister(userId);
      window.alert('회원 탈퇴 되었습니다!');
    } catch (err) {
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);
