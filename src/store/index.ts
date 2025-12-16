import { configureStore } from "@reduxjs/toolkit";
import kontikisReducer from "./kontikis/ kontikisSlice";
export const store = configureStore({
  reducer: {
    kontikis: kontikisReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
