import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@slice/themeSlice';
import userReducer from '@slice/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
  devTools: __DEV__,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
