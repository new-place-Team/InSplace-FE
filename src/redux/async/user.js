/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { history } from '../configureStore';
import {
  addUser,
  logIn,
  logInCheck,
  unRegister,
  logInKakao,
  getFavories,
  getVisited,
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
        history.push('/login');
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
          userId: response.data.userId,
          email: response.data.email,
          nickname: response.data.nickname,
          userImage: response.data.userImage,
          mbti: response.data.mbti,
        };
        history.replace('/');
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
  async thunkAPI => {
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
      console.log(response);
      history.replace('/login');
    } catch (err) {
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);
// 카카오 로그인
export const kakaoLogin = createAsyncThunk('user/kakaoRegister', async code => {
  console.log(code);
  try {
    // 백 서버에 인가 코드 전달
    const response = await logInKakao(code);
    if (response) {
      const USER_TOKEN = response.data.token;
      window.localStorage.setItem('USER_TOKEN', USER_TOKEN);
      const userInfo = {
        userId: response.data.userId,
        email: response.data.email,
        nickname: response.data.nickname,
        userImage: response.data.userImage,
        mbti: response.data.mbti,
      };
      history.replace('/');
      return userInfo;
    }
  } catch (err) {
    console.log(err);
    window.alert(err);
    history.replace('/');
  }
});
/* 유저 좋아요 리스트 조회 */
export const getFavoritesDB = createAsyncThunk(
  'user/getFavorites',
  async thunkAPI => {
    try {
      const response = await getFavories();
      return response.data;
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
/* 유저 가본곳 리스트 조회 */
export const getVisitedDB = createAsyncThunk(
  'user/getVisited',
  async thunkAPI => {
    try {
      const response = await getVisited();
      return response.data;
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
