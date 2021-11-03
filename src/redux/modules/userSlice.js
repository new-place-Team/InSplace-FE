/* eslint-disable */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addUserDB, logInDB, logInCheckDB, unRegisterDB } from '../async/user';

// inititalState
const initialState = {
  userMbti: {},
  userInfo: {},
  modalStatus: false,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMbti: (state, { payload }) => {
      state.userMbti = payload;
    },
    setModalOff: (state, { payload }) => {
      state.modalStatus = false;
    },
    setModalOn: (state, { payload }) => {
      state.modalStatus = true;
    },
    logOut: (state, { payload }) => {
      localStorage.removeItem('USER_TOKEN');
      state.userInfo = {};
      state.isLogin = false;
      window.customAlert('로그아웃 되었습니다!');
    },
  },
  extraReducers: {
    // 회원가입 성공시
    [addUserDB.fulfilled]: (state, { payload }) => {
      window.customAlert('회원가입이 완료 되었습니다!');
    },
    // 회원가입 실패시
    [addUserDB.rejected]: (state, action) => {
      window.alert(action.meta.response.data.errMsg);
    },
    // 로그인 성공시
    [logInDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
      window.customAlert('로그인 되셨습니다! 환영합니다!');
    },
    // 로그인 실패시
    [logInDB.rejected]: (state, action) => {
      window.customAlert(action.meta.response.data.errMsg);
    },
    // 로그인 체크
    [logInCheckDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
    },
    [unRegisterDB.rejected]: (state, action) => {
      window.customAlert(action.meta.response.data.errMsg);
    },
  },
});

export const { getMbti, setModalOff, setModalOn, logOut } = userSlice.actions;

export default userSlice;
