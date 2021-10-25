/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getRoomListDB } from '../async/room';

/* init */
const initialState = {
  count: 0,
  list: [],
  is_loading: false,
  errorMessage: '',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increaseCount: (state, { payload }) => {
      state.count += 1;
      state.id = payload;
    },
  },
  extraReducers: {
    /* Fulfilled(이행) 비동기 처리 완료 */
    [getRoomListDB.fulfilled]: (state, { payload }) => {
      console.log('<<<', payload);
      state.list = payload;
      state.is_loading = false;
    },
    /* Pending(대기) */
    [getRoomListDB.pending]: (state, { payload }) => {
      state.is_loading = true;
    },
    /* Rejected(실패) */
    [getRoomListDB.rejected]: (state, { payload }) => {
      state.is_loading = false;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const { increaseCount } = counterSlice.actions;

export default counterSlice;
