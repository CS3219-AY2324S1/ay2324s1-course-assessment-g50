import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { matchWithUser } from "../services/matching.service";


const initialState = {
  matchedUserId: null,
  matchedUserName: null,
  matchedQuestionName: null,
  status: "idle",
}


const matchingSlice = createSlice({
  name: "matchingService",
  initialState,
  reducers: {
      resetStatus: (state) => {
          state.status = "idle";
        },
  },extraReducers(builder) {
    builder
      .addCase(establishingConnectionAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(establishingConnectionAction.fulfilled, (state, action) => {
        state.status = "successfullyConnected";
      })
      .addCase(establishingConnectionAction.rejected, (state, action) => {
        state.status = "failedConnection";
      })
  },
});

export const establishingConnectionAction = createAsyncThunk(
  "matchingServer/establishingConnections",
  matchWithUser
);


export const { resetStatus } = matchingSlice.actions;

export default matchingSlice.reducer;