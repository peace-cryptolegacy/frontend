import { configureStore } from '@reduxjs/toolkit';
import web3Reducer from 'store/reducers/web3';

export const store = configureStore({
  reducer: {
    web3: web3Reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
