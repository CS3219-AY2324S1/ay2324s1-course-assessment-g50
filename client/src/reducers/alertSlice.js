import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    removeMessage(state, action) {
      const id = action.payload;
      state.messages = state.messages.filter((msg) => msg.id !== id);
    },
  },
});

export const { addMessage, removeMessage } = alertSlice.actions;
export default alertSlice.reducer;
