import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, fetchUserData, updateUserBasicInfo, updateUserBasicAvatarInfo, updateUserAccountInfo, deregisterUser } from "../services/user.service";

const initialState = {
    userId: null,
    email: null,
    passwordLength: null,
    nickname: null,
    birth: null,
    sign: null,
    gender: null,
    avatar: null,
    isLoggedIn: localStorage.getItem('loggedIn') === 'true',
    errorLogs: null,
    status: "idle",
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
            localStorage.setItem('loggedIn', 'true');
        })
        .addCase(loginAction.rejected, (state, action) => {
            state.status = "failedLogin";
            state.isLoggedIn = false;
        })
        .addCase(logoutAction.fulfilled, (state, action) => {
            state.status = "sucessfulLogout";
            state.isLoggedIn = false;
            localStorage.removeItem('loggedIn');
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
        });
    },
});

const selectIsLoggedIn = (state) => state.currentUser.isLoggedIn;

const loginAction = createAsyncThunk(
    "user/login",
    async ({ email, password }) => {
        const response = await loginUser(email, password);
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
    async ({ email, password }) => {
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
    async (object, { rejectWithValue }) => {
        try {
            await updateUserBasicInfo(object);
            return;
        } catch (error) {
            return rejectWithValue(JSON.stringify(error.response.data.data))
        }
    }
);

// For Avatar info
const updateUserBasicAvatarInfoAction = createAsyncThunk(
    "user/updateUserBasicAvatarInfo",
    async (object, { rejectWithValue }) => {
        try {
            await updateUserBasicAvatarInfo(object);
            return;
        } catch (error) {
            return rejectWithValue(JSON.stringify(error.response.data.data))
        }
    }
)

// For account info, email and password
const updateUserAccountInfoAction = createAsyncThunk(
    "user/updateUserAccountInfo",
    async (object, { rejectWithValue }) => {
        try {
            await updateUserAccountInfo(object);
            return;
        } catch (error) {
            return rejectWithValue(JSON.stringify(error.response.data.data))
        }
    }
);

const deregisterUserAction = createAsyncThunk(
    "user/deregisterUser",
    async ({ rejectWithValue }) => {
        try {
            await deregisterUser();
            return;
        } catch (error) {
            return rejectWithValue(JSON.stringify(error.response.data.data))
        }
    }
)

export {
    loginAction, logoutAction, registerAction, selectIsLoggedIn, fetchUserDataAction,
    updateUserBasicInfoAction, updateUserAccountInfoAction, updateUserBasicAvatarInfoAction, deregisterUserAction
};

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;