import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addUser, logIn } from '../../shared/api/userApi';

// 회원등록
export const addUserDB = createAsyncThunk(
  'user/addUser',
  // eslint-disable-next-line consistent-return
  async (data, thunkAPI) => {
    try {
      const response = await addUser(data);
      if (response) {
        console.log(response);
        return response;
      }
    } catch (err) {
      console.log('error ::::::', err);
      return thunkAPI.rejectWithValue('<<', err);
    }
  },
);

export const logInDB = createAsyncThunk(
  'user/logIn',
  async (data, thunkAPI) => {
    try {
      const response = await logIn(data);
      if (response) {
        console.log(response);
      }
    } catch (err) {
      console.log('error ::::::', err);
    }
  },
);
