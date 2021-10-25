import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRoomList } from '../../shared/api/roomApi';

export const getRoomListDB = createAsyncThunk(
  'room/getList',
  // eslint-disable-next-line consistent-return
  async (params, thunkAPI) => {
    try {
      const response = await getRoomList(params);
      if (response) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
