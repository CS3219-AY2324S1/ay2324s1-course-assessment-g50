import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/questionSlice";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
  },
});
