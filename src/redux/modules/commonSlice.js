/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// inititalState
const initialState = {
  modalStatus: false,
  title: null,
  content: null,
};

const commonSlice = createSlice({
  name: 'commonModal',
  initialState,
  reducers: {
    setCommonModalOff: state => {
      state.modalStatus = false;
      state.title = null;
      state.content = null;
    },
    setCommonModalOn: (state, { payload }) => {
      state.modalStatus = true;
      state.title = payload.title;
      state.content = payload.content;
    },
  },
});

export const { setCommonModalOff, setCommonModalOn } = commonSlice.actions;

export default commonSlice;
