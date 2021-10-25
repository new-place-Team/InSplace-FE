/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

/* init */
const initialState = {
  count: 0,
  id: '',
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
});

export const { increaseCount } = counterSlice.actions;

export default counterSlice;
