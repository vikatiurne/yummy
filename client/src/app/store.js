import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, authReducer, homeReducer,prodactReducer } from '../pages';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer,
    prodact: prodactReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
