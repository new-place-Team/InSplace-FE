/* eslint-disable */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  addUserDB,
  logInDB,
  logInCheckDB,
  unRegisterDB,
  kakaoLogin,
  getFavoritesDB,
  getVisitedDB,
  editProfileDB,
} from '../async/user';

// inititalState
const initialState = {
  userMbti: {},
  userInfo: {},
  modalStatus: false,
  isLogin: false,
  userPickPlaces: { likeList: null, visitedList: null },
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
      window.alert('로그아웃 되었습니다!');
    },
    /* 유저 좋아요 포스트 추가 */
    addUserLikePost: (state, { payload }) => {
      let likeList = state.userPickPlaces.likeList;
      if (likeList) {
        state.userPickPlaces.likeList = [...likeList, payload];
      }
    },
    /* 유저 좋아요 포스트 삭제 */
    deleteUserLikePost: (state, { payload }) => {
      let likeList = state.userPickPlaces.likeList;
      if (likeList) {
        state.userPickPlaces.likeList = likeList.filter(
          v => v.postId !== payload.postId,
        );
      }
    },
    /* 유저 방문 포스트 추가 */
    addUserVisitedPost: (state, { payload }) => {
      let visitedList = state.userPickPlaces.visitedList;
      if (visitedList) {
        state.userPickPlaces.visitedList = [...visitedList, payload];
      }
    },
    /* 유저 방문 포스트 삭제 */
    deleteUserVisitedPost: (state, { payload }) => {
      let visitedList = state.userPickPlaces.visitedList;
      if (visitedList) {
        state.userPickPlaces.visitedList = visitedList.filter(
          v => v.postId !== payload.postId,
        );
      }
    },
  },
  extraReducers: {
    // 회원가입 성공시
    [addUserDB.fulfilled]: (state, { payload }) => {
      window.alert('회원가입이 완료 되었습니다!');
    },
    // 회원가입 실패시
    [addUserDB.rejected]: (state, action) => {
      window.alert(action.meta.response.data.errMsg);
    },
    // 로그인 성공시
    [logInDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
      window.alert('로그인 되셨습니다! 환영합니다!');
    },
    [kakaoLogin.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
    },
    // 로그인 실패시
    [logInDB.rejected]: (state, action) => {
      window.alert(action.meta.response.data.errMsg);
    },
    // 로그인 체크
    [logInCheckDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
    },
    [unRegisterDB.rejected]: (state, action) => {
      window.alert(action.meta.response.data.errMsg);
    },
    /* 유저 좋아요 리스트 조회 성공시*/
    [getFavoritesDB.fulfilled]: (state, { payload }) => {
      state.userPickPlaces.likeList = payload.favoritePosts;
    },
    /* 유저 가본곳 리스트 조회 성공시 */
    [getVisitedDB.fulfilled]: (state, { payload }) => {
      state.userPickPlaces.visitedList = payload.visitedPosts;
    },
    /* 유저 정보 수정 */
    [editProfileDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export const {
  getMbti,
  setModalOff,
  setModalOn,
  logOut,
  addUserLikePost,
  deleteUserLikePost,
  addUserVisitedPost,
  deleteUserVisitedPost,
} = userSlice.actions;

export default userSlice;
