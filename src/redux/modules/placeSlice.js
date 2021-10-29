/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMainListDB } from '../async/place';

/* init */
const initialState = {
  mainLists: {},
  weatherList: [],
};

const placeSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    mainLists: (state, { payload }) => {
      state.mainLists = payload;
      state.weatherList = payload.weatherPlace;
    },
  },
  extraReducers: {
    /* Fulfilled(이행) 처리 완료 */
    [getMainListDB.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.mainLists = payload;
    },
    /* rejected 처리 실패 */
    [getMainListDB.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default placeSlice;
