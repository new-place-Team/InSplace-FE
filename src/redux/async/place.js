/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMainList } from '../../shared/api/placeApi';

export const getMainListDB = createAsyncThunk(
  'place/mainList',
  async (params, thunkAPI) => {
    try {
      const response = await getMainList(params);
      if (response) {
        return response.data.payload;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
