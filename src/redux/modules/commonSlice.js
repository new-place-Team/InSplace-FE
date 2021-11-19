/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// inititalState
const initialState = {
  modalStatus: false,
  modalInfo: null,
  confirmModalStatus: false,
  confirmModalInfo: null,
  goPage: null,
  dispatchFun: null,
  moreModalStatus: false,
  moreInfo: null,
};

const commonSlice = createSlice({
  name: 'commonModal',
  initialState,
  reducers: {
    setCommonModalOff: state => {
      state.modalStatus = false;
      state.modalInfo = null;
      state.goPage = null;
      state.dispatchFun = null;
    },
    setCommonModalOn: (state, { payload }) => {
      state.modalStatus = true;
      state.modalInfo = payload;
      state.goPage = payload.goPage;
      state.dispatchFun = payload.dispatchFun;
    },
    setMoreModalOff: state => {
      state.moreModalStatus = false;
      state.moreInfo = null;
    },
    setMoreModalOn: (state, { payload }) => {
      state.moreModalStatus = true;
      state.moreInfo = payload;
    },
    setConfirmMoreModalOff: state => {
      state.confirmModalStatus = false;
      state.confirmModalInfo = null;
    },
    setConfirmMoreModalOn: (state, { payload }) => {
      state.confirmModalStatus = true;
      state.confirmModalInfo = payload;
    },
  },
});

export const {
  setCommonModalOff,
  setCommonModalOn,
  setMoreModalOff,
  setMoreModalOn,
} = commonSlice.actions;

export default commonSlice;
