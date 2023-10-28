import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { matchWithUser } from "../services/matching.service";
import { retrieveQuestionDetails } from "../services/question.service";
import {addMessage} from "./alertSlice";
import AlertNotification from "../services/alert.service";

const initialState = {
  matchedId: null,
  matchedUserInfo: null, 
  matchedQuestionName: null,
  matchedQuestionDetails: null,
  status: "idle",
  errorInfo: null
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
        state.status = "sucessfullyConnected";
        state.matchedId = action.payload.matchId;
        state.matchedUserInfo = action.payload.matchUsers
      })
      .addCase(establishingConnectionAction.rejected, (state, action) => {
        state.status = "failedConnection";
        state.errorInfo = action.payload;
      })
      .addCase(retrieveQuestionDetailsAction.fulfilled, (state, action) => {
        state.status = "sucessfullyFetchQuestion";
        state.matchedQuestionDetails = action.payload;
      })
      .addCase(retrieveQuestionDetailsAction.rejected, (state, action) => {
        console.log("failed");
        state.status = "failedToFetchQuestion";
      })
  },
});

const establishingConnectionAction = createAsyncThunk(
  "matchingServer/establishingConnections",
  matchWithUser
);

const retrieveQuestionDetailsAction = createAsyncThunk(
  "matchingServer/getQuestionDetails",
  async ({ questionName }) => {
    const response = await retrieveQuestionDetails(questionName);
    return response.data;
  }
)

export { establishingConnectionAction, retrieveQuestionDetailsAction };

export default matchingSlice.reducer;