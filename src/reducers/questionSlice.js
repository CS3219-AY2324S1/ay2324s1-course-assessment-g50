import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { client } from
import {
  getQuestions,
  addQuestionToRepo,
  deleteQuestionFromRepo,
} from "../services/question.service";

const initialState = {
  questions: [],
  // add loading status/error here when integrating with backend
  status: "idle",
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addNewQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = action.payload;
      });
  },
});

// state parameter refers to root redux state object
export const selectAllQuestions = (state) => state.questions.questions;

// first parameter: action prefix
// @Todo: await actual api call (replace getQuestions)
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await getQuestions();
    return response.data;
  }
);

// @Todo: await actual api call (replace addQuestionToRepo)
export const addNewQuestion = createAsyncThunk(
  "posts/addNewQuestion",
  async (formData) => {
    const response = await addQuestionToRepo(formData);

    // The response includes unique ID
    return response.data;
  }
);

// @Todo: await actual api call (replace deleteQuestionFromRepo)
export const deleteQuestion = createAsyncThunk(
  "posts/deleteQuestion",
  async (id) => {
    const response = await deleteQuestionFromRepo(id);
    return response.data;
  }
);

export default questionSlice.reducer;
