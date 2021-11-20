/* eslint-disable no-unreachable */
/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { history } from '../configureStore';
import {
  logIn,
  logInCheck,
  unRegister,
  logInKakao,
  addUser,
  getFavories,
  getVisited,
  editProfile,
} from '../../shared/api/userApi';
import { getLoaded } from '../modules/loadedSlice';
import { setCommonModalOn } from '../modules/commonSlice';

// 회원등록
export const addUserDB = createAsyncThunk(
  'user/addUser',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    try {
      const response = await addUser(data);
      const modalParams = {
        title: '회원가입에 성공하셨습니다',
        goPage: '/login',
      };
      // thunkAPI.dispatch(setCommonModalOn(modalParams));
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);

// 로그인
export const logInDB = createAsyncThunk(
  'user/logIn',

  async (data, thunkAPI) => {
    try {
      const response = await logIn(data);
      if (response) {
        const USER_TOKEN = response.data.token;
        window.localStorage.setItem('USER_TOKEN', USER_TOKEN);

        const userInfo = {
          userId: response.data.userId,
          email: response.data.email,
          maleYN: response.data.maleYN,
          nickname: response.data.nickname,
          userImage: response.data.userImage,
          mbti: response.data.mbti,
        };
        const modalParams = {
          title: '로그인에 성공하셨습니다',
          goPage: '/',
        };
        thunkAPI.dispatch(setCommonModalOn(modalParams));
        return userInfo;
      }
    } catch (err) {
      console.log('error ::::::', err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
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
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
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
      // const response = await unRegister(userId);
      // eslint-disable-next-line no-undef
      localStorage.removeItem('USER_TOKEN');
      console.log('회원탈퇴 ==');
      // history.replace('/login');
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);
// 카카오 로그인
export const kakaoLogin = createAsyncThunk(
  'user/kakaoRegister',
  async (code, thunkAPI) => {
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
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue('<<', err);
      // window.alert(err);
      // history.replace('/');
    }
  },
);
/* 유저 좋아요 리스트 조회 */
export const getFavoritesDB = createAsyncThunk(
  'user/getFavorites',
  async (_params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getFavories();
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
/* 유저 가본곳 리스트 조회 */
export const getVisitedDB = createAsyncThunk(
  'user/getVisited',
  async (_params, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoaded(true));
      const response = await getVisited();
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

/* 유저 정보 수정 */
export const editProfileDB = createAsyncThunk(
  'user/editProfile',
  async (params, thunkAPI) => {
    try {
      const response = await editProfile(params);
      // window.alert('회원정보가 수정되었습니다.');
      // history.push('/mypage');
      const modalParams = {
        title: params.msg,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      history.push('/mypage');
      return response.data;
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      thunkAPI.dispatch(setCommonModalOn(modalParams));
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);
