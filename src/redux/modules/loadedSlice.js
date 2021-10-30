/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  is_loaded: false,
};

const loadedSlice = createSlice({
  name: 'loadSpinner',
  initialState,
  reducers: {
    getLoaded: (state, { payload }) => {
      state.is_loaded = payload;
    },
  },
});
export const { getLoaded } = loadedSlice.actions;

export default loadedSlice;