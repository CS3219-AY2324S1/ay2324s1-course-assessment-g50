import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/questionSlice";
import userReducer from "./reducers/userSlice";
import alertsReducer from "./reducers/alertSlice";
import matchingReducer from "./reducers/matchingSlice";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    alerts: alertsReducer,
    currentUser: userReducer,
    matching: matchingReducer,
  },
});
