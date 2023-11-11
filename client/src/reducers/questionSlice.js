import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalQuestionCount } from "../services/question.service";
import {
  getQuestions,
  addQuestionToRepo,
  deleteQuestionFromRepo,
  updateQuestionFromRepo,
} from "../services/question.service";
import { retrieveQuestionDetails } from "../services/question.service";


const initialState = {
  questions: [],
  totalQuestionCount: 0,
  // filter state
  filters: {
    sort: null, 
    complexity: null,
    keyword: null, 
    topicSlugs: null,
    page: null,
    pageSize: null,
  },
  // add loading status/error here when integrating with backend
  status: "idle",
  attemptedQuestionDetails: null,
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
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
        state.totalQuestionCount++;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "outdated";
        state.totalQuestionCount--;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = "outdated";
      })
      .addCase(fetchTotalQuestionCount.fulfilled, (state, action) => {
        state.totalQuestionCount = action.payload;
      })
      .addCase(fetchAttemptedQuestionDetails.fulfilled, (state, action) => {
        state.attemptedQuestionDetails = action.payload;
      })
      
  },
});

// state parameter refers to root redux state object
export const selectAllQuestions = (state) => state.questions.questions;
export const selectFilters = (state) => state.questions.filters;
export const selectTotalQuestionCount = (state) => state.questions.totalQuestionCount;
export const { updateFilter } = questionSlice.actions;

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (filters) => {
    const response = await getQuestions(filters);
    return response;
  }
);

export const addNewQuestion = createAsyncThunk(
  "posts/addNewQuestion",
  async (allFields) => {
    const {required, optionalFields } = allFields;
    const response = await addQuestionToRepo(required, optionalFields);
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

export const fetchTotalQuestionCount = createAsyncThunk(
  "questions/fetchQuestionCount",
  async () => {
    const response = await getTotalQuestionCount();
    return response;
  }
);

export const fetchAttemptedQuestionDetails = createAsyncThunk(
  "questions/fetchAttemptedQuestionDetails",
  async ({ questionName }) => {
    //technically this is being used in matchingSlice for retrieving question details instead of userSlice
    const response = await retrieveQuestionDetails(questionName); 
    return response.data;
  }
)

export default questionSlice.reducer;
