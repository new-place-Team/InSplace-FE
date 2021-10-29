import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

/* slice module */
import counterSlice from './modules/counterSlice';
import selectedSlice from './modules/selected';

export const history = createBrowserHistory();

/* Reducer combine */
const reducer = combineReducers({
  router: connectRouter(history),
  counter: counterSlice.reducer,
  selected: selectedSlice.reducer,
});

const middlewares = [];
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;

if (env === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== 'production',
});

export default store;
