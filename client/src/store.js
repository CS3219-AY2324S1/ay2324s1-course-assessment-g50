import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/questionSlice";
import alertsReducer from "./reducers/alertSlice";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    alerts: alertsReducer,
  },
});
