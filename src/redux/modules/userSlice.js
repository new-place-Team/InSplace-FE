/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addUserDB } from '../async/user';

// inititalState
const initialState = {
  userMbti: {},
  userInfo: {},
  modalStatus: false,
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
  },
  extraReducers: {
    [addUserDB.fulfilled]: (state, { payload }) => {
      window.alert('회원가입이 완료 되었습니다!');
    },
    [addUserDB.rejected]: (state, action) => {
      window.alert(action.meta.response.data.errMsg);
    },
  },
});

export const { getMbti, setModalOff, setModalOn } = userSlice.actions;

export default userSlice;
