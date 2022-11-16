import { configureStore } from '@reduxjs/toolkit';
import web3Reducer from 'store/reducers/web3';
import testamentInfoReducer from 'store/reducers/testamentInfo';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.balance', 'payload.proofOfTimestamp'],
        ignoredPaths: [
          'web3.balance',
          'web3.inheritor.proofOfTimestamp',
          'web3.testator.proofOfTimestamp',
        ],
      },
    }),
  reducer: {
    web3: web3Reducer,
    testamentInfo: testamentInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
