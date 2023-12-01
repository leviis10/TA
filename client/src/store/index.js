import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import uiReducer from "./reducers/ui";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
