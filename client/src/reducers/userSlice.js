import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, fetchUserData, updateUserBasicInfo,updateUserBasicAvatarInfo, 
    updateUserAccountInfo, deregisterUser, fetchUserAttemptHistory, fetchUserAttemptHistoryPageCount, fetchUserAttemptDetails,
    updateAttemptQuestionName } from "../services/user.service";

const initialState = {
    userId: null,
    email: null,
    passwordLength: null,
    nickname: null,
    birth: null,
    sign: null,
    gender: null,
    avatar: null,
    isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
    userRole: sessionStorage.getItem("userRole"),
    status: "idle",
    attemptedQuestionHistory: [],
    attemptedQuestionHistoryPageCount: 1,
    questionAttemptsArray: [] //is an array of various attempts with different languages
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
          },
    },
    extraReducers(builder) {
        builder
        .addCase(loginAction.fulfilled, (state, action) => {
            state.status = "sucessfulLogin";
            state.isLoggedIn = true;
            state.userRole = action.payload.userRole;
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userRole', action.payload.userRole);
        })
        .addCase(loginAction.rejected, (state, action) => {
            state.status = "failedLogin";
            state.isLoggedIn = false;
        })
        .addCase(logoutAction.fulfilled, (state, action) => {
            state.status = "sucessfulLogout";
            state.isLoggedIn = false;
            state.userRole = null;
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('userRole');
        })
        .addCase(registerAction.fulfilled, (state, action) => {
            state.status = "sucessfulRegistration";
        })
        .addCase(registerAction.rejected, (state, action) => {
            if (action.error.message === "INVALID_EMAIL") {
                state.status = "givenInvalidEmail";
            } else {
                state.status = "failedRegistration";
            }
        })
        .addCase(fetchUserDataAction.fulfilled, (state, action) => {
            const userData = action.payload;
            state.status = "sucessfulFetch";
            state.email = userData.email;
            state.passwordLength = userData.passwordLength;
            state.userId = userData.userId;
            state.nickname = userData.nickname;
            state.birth = userData.birth;
            state.sign = userData.sign;
            state.gender = userData.gender;
            state.avatar = userData.avatar;
        })
        .addCase(updateUserBasicInfoAction.fulfilled, (state, action) => {
            state.status = "sucessfulBasicInfoUpdate";
        })
        .addCase(updateUserBasicInfoAction.rejected, (state, action) => {
            if (action.error.message === "INVALID_INPUT") {
                state.status = "givenInvalidInfoUpdate";
            } else {
                state.status = "failedBasicInfoUpdate";
            }
        })
        .addCase(updateUserBasicAvatarInfoAction.fulfilled, (state, action) => {
            state.status = "sucessfulBasicAvatarInfoUpdate";
        })
        .addCase(updateUserBasicAvatarInfoAction.rejected, (state, action) => {
            state.status = "failedBasicAvatarInfoUpdate";
        })
        .addCase(updateUserAccountInfoAction.fulfilled, (state, action) => {
            state.status = "sucessfulAccountInfoUpdate";
        })
        .addCase(updateUserAccountInfoAction.rejected, (state, action) => {
            state.status = "failedBasicInfoUpdate";
        })
        .addCase(deregisterUserAction.fulfilled, (state, action) => {
            state.status = "accountDeleted";
            state.isLoggedIn = false;
        })
        .addCase(deregisterUserAction.rejected, (state, action) => {
            state.status = "accountNotDeleted";
        })
        .addCase(fetchUserAttemptHistoryAction.fulfilled, (state, action) => {
            state.status = "fetchHistorySucessful";
            state.attemptedQuestionHistory = action.payload
        })
        .addCase(fetchUserAttemptHistoryPageCountAction.fulfilled, (state, action) => {
            state.status = "fetchHistoryPageCountSucessful";
            state.attemptedQuestionHistoryPageCount = action.payload
        })
        .addCase(fetchUserAttemptDetailsAction.fulfilled, (state, action) => {
            state.status = "fetchAttemptDetailsSucessfully";
            state.questionAttemptsArray = action.payload;
        })
        .addCase(updateAttemptQuestionNameAction.fulfilled, (state, action) => {
            console.log("updated sucessfully question name");
            state.status = "UpdateQuestionNameSucessfully";
        });
    },
});

const selectIsLoggedIn = (state) => state.currentUser.isLoggedIn;

const loginAction = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
        const response = await loginUser(email, password);
        console.log(response.data)
        return response.data;
    }
);

const logoutAction = createAsyncThunk(
    "user/logout",
    async () => {
        await logoutUser();
        return;
    }
);

const registerAction = createAsyncThunk(
    "user/register",
    async ({email, password}) => {
        await registerUser(email, password);
        return;
    }
);

const fetchUserDataAction = createAsyncThunk(
    "user/fetchUserData",
    async () => {
      const response = await fetchUserData();
      return response.data;
    }
);

// For basic info
const updateUserBasicInfoAction = createAsyncThunk(
    "user/updateUserBasicInfo",
    async (object) => {
        await updateUserBasicInfo(object);
        return;
    }
);

// For Avatar info
const updateUserBasicAvatarInfoAction = createAsyncThunk(
    "user/updateUserBasicAvatarInfo",
    async (object) => {
        const response = await updateUserBasicAvatarInfo(object);
        if (response.code != 201) {
            throw new Error('Failed to update user avatar');
        }
        return;
    }
)

// For account info, email and password
const updateUserAccountInfoAction = createAsyncThunk(
    "user/updateUserAccountInfo",
    async (object) => {
        await updateUserAccountInfo(object);
        return;
    }
);

const deregisterUserAction = createAsyncThunk(
    "user/deregisterUser",
    async () => {
        await deregisterUser();
    }
)

// For fetching the attempt history of the user
const fetchUserAttemptHistoryAction = createAsyncThunk(
    "user/retrieveUserHistory",
    async ({ pageNumber }) => {
        const response = await fetchUserAttemptHistory(pageNumber);
        return response.data;
    }
)


// For fetching the attempt history page count of the user
const fetchUserAttemptHistoryPageCountAction = createAsyncThunk(
    "user/retrieveUserHistoryPageCount",
    async () => {
        const response = await fetchUserAttemptHistoryPageCount();
        return response.data;
    }
)

// For fetching the attempt history page count of the user
const fetchUserAttemptDetailsAction = createAsyncThunk(
    "user/retrieveUserAttemptDetails",
    async ({ questionName }) => {
        const response = await fetchUserAttemptDetails(questionName);
        return response.data;
    }
)

// updates the questions in histories db
const updateAttemptQuestionNameAction = createAsyncThunk(
    "user/updateUserHistoryQuestionName",
    async ({ oldQuestionName, newQuestionName }) => {
        await updateAttemptQuestionName(oldQuestionName, newQuestionName);
        return;
    }
)

export { loginAction, logoutAction, registerAction, selectIsLoggedIn, fetchUserDataAction, fetchUserAttemptHistoryAction,
    updateUserBasicInfoAction, updateUserAccountInfoAction, updateUserBasicAvatarInfoAction, deregisterUserAction, 
    fetchUserAttemptHistoryPageCountAction, fetchUserAttemptDetailsAction, updateAttemptQuestionNameAction };

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;