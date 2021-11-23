/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// inititalState
const initialState = {
  modalStatus: false,
  modalInfo: null,
  goPage: null,
  moreModalStatus: false,
  moreInfo: null,
  reportModalStatus: false,
  feedbackStatus: false,
  currentLanguage: null,
  errorStatus: false,
};

const commonSlice = createSlice({
  name: 'commonModal',
  initialState,
  reducers: {
    setCommonModalOff: state => {
      state.modalStatus = false;
      state.modalInfo = null;
      state.goPage = null;
    },
    setCommonModalOn: (state, { payload }) => {
      state.modalStatus = true;
      state.modalInfo = payload;
      state.goPage = payload.goPage;
    },
    setMoreModalOff: state => {
      state.moreModalStatus = false;
      state.moreInfo = null;
    },
    setMoreModalOn: (state, { payload }) => {
      state.moreModalStatus = true;
      state.moreInfo = payload;
    },
    setReportModalOff: state => {
      state.reportModalStatus = false;
      state.modalInfo = null;
    },
    setReportModalOn: (state, { payload }) => {
      state.reportModalStatus = true;
      state.modalInfo = payload;
    },
    setFeedbackModalOff: state => {
      state.feedbackStatus = false;
    },
    setFeedbackModalOn: state => {
      state.feedbackStatus = true;
    },
    setErrorModalOff: state => {
      state.errorStatus = false;
      state.modalInfo = null;
    },
    setErrorModalOn: (state, { payload }) => {
      state.errorStatus = true;
      state.modalInfo = payload;
    },
  },
});

export const {
  setCommonModalOff,
  setCommonModalOn,
  setMoreModalOff,
  setMoreModalOn,
  setReportModalOff,
  setReportModalOn,
  setFeedbackModalOff,
  setFeedbackModalOn,
  setLanguage,
  setErrorModalOff,
  setErrorModalOn,
} = commonSlice.actions;

export default commonSlice;
