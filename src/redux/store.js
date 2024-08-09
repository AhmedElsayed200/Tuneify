import { configureStore } from '@reduxjs/toolkit';
import { musicAPI } from './APIs/libraryAPI';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [musicAPI.reducerPath]: musicAPI.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicAPI.middleware),
});
