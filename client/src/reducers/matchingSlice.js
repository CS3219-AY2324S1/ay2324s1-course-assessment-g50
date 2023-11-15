import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { matchWithUser } from "../services/matching.service";


const initialState = {
  matchedId: null,
  category: null,
  complexity: null,
  status: "idle",
  error: null,
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
        console.log(action.payload);
        state.matchedId = action.payload.matchedId;
        state.complexity = action.payload.complexity;
        state.category = action.payload.category;
        state.status = "successfullyConnected";
      })
      .addCase(establishingConnectionAction.rejected, (state, action) => {
        state.status = "failedConnection";
        state.error = action.payload;
      })
  },
});

export const establishingConnectionAction = createAsyncThunk(
  "matchingServer/establishingConnections",
  matchWithUser
);