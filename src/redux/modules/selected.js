/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    getSelected: (state, { payload }) => {
      state.selected.push(payload);
    },
  },
});
export const { getSelected } = selectedSlice.actions;

export default selectedSlice;
