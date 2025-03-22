import { configureStore } from '@reduxjs/toolkit';
import analysisReducer from './slices/analysisSlice';

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;