import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, authReducer, homeReducer } from '../pages';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
