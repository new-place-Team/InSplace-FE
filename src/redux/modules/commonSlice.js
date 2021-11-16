/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// inititalState
const initialState = {
  modalStatus: false,
  title: null,
  content: null,
  goPage: null,
  dispatchFun: null,
};

const commonSlice = createSlice({
  name: 'commonModal',
  initialState,
  reducers: {
    setCommonModalOff: state => {
      state.modalStatus = false;
      state.title = null;
      state.content = null;
      state.goPage = null;
      state.dispatchFun = null;
    },
    setCommonModalOn: (state, { payload }) => {
      state.modalStatus = true;
      state.title = payload.title;
      state.content = payload.content;
      state.goPage = payload.goPage;
      state.dispatchFun = payload.dispatchFun;
    },
  },
});

export const { setCommonModalOff, setCommonModalOn } = commonSlice.actions;

export default commonSlice;
