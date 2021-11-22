/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

/* slice module */
import placeSlice from './modules/placeSlice';
import loadedSlice from './modules/loadedSlice';
import userSlice from './modules/userSlice';
import commonSlice from './modules/commonSlice';

export const history = createBrowserHistory();

/* Reducer combine */
const reducer = combineReducers({
  place: placeSlice.reducer,
  loaded: loadedSlice.reducer,
  user: userSlice.reducer,
  common: commonSlice.reducer,
  router: connectRouter(history),
});

const middlewares = [];
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;

if (env === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: [
    ...middlewares,
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  devTools: env !== 'production',
});

export default store;
