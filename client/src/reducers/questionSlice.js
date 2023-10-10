import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getQuestions,
  addQuestionToRepo,
  deleteQuestionFromRepo,
  updateQuestionFromRepo,
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
        state.questions.length = [];
      })
      .addCase(addNewQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "outdated";
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = "outdated";
      });
  },
});

// state parameter refers to root redux state object
export const selectAllQuestions = (state) => state.questions.questions;

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await getQuestions();
    return response;
  }
);

export const addNewQuestion = createAsyncThunk(
  "posts/addNewQuestion",
  async (formData) => {
    const response = await addQuestionToRepo(formData);
    return response;
  }
);

export const deleteQuestion = createAsyncThunk(
  "posts/deleteQuestion",
  async (id) => {
    await deleteQuestionFromRepo(id);
  }
);

export const updateQuestion = createAsyncThunk(
  "posts/updateQuestion",
  async (formData) => {
    await updateQuestionFromRepo(formData);
  }
);

export default questionSlice.reducer;
