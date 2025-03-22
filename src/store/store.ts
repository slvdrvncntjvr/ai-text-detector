import { configureStore } from '@reduxjs/toolkit';
import analysisReducer from './slices/analysisSlice';
import modelReducer from './slices/modelSlice';

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    model: modelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific paths
        ignoredActions: ['model/setModel'],
        ignoredPaths: ['model.instance'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;