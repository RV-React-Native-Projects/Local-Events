import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@slice/authSlice';
import eventsReducer from '@slice/eventsSlice';
import themeReducer from '@slice/themeSlice';
import userReducer from '@slice/userSlice';
import usersReducer from '@slice/usersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
    events: eventsReducer,
    users: usersReducer,
  },
  devTools: __DEV__,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
