import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, fetchUserData, updateUserBasicInfo, updateUserAccountInfo, deregisterUser } from "../services/user.service";

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
    register: false,
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
            state.register = true;
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
            state.status = "failedBasicInfoUpdate";
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
        });
    },
});

const selectIsLoggedIn = (state) => state.currentUser.isLoggedIn;

const loginAction = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
      const response = await loginUser(email, password);
      if (response.code === 200) {
        return response.data;
      } else {
        throw new Error("Failed to login");
      }
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
        const response = await updateUserBasicInfo(object);
        if (response.code !== 201) {
            throw new Error("Failed to update basic info");
        }
        return;
    }
);

// For account info, email and password
const updateUserAccountInfoAction = createAsyncThunk(
    "user/updateUserAccountInfo",
    async (object) => {
        const response = await updateUserAccountInfo(object);

        if (response.code !== 201) {
            throw new Error("Failed to update account info");
        }
        return;
    }
);

const deregisterUserAction = createAsyncThunk(
    "user/deregisterUser",
    async () => {
        await deregisterUser();
    }
)

export { loginAction, logoutAction, registerAction, selectIsLoggedIn, fetchUserDataAction, 
    updateUserBasicInfoAction, updateUserAccountInfoAction, deregisterUserAction };

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;