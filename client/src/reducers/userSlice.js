import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, getUserData, updateUserInfo, deregisterUser } from "../services/user.service";

const initialState = {
    userId: null,
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
            console.log("reseting");
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
            state.userId = userData.userId;
            state.nickname = userData.nickname;
            state.birth = userData.birth;
            state.sign = userData.sign;
            state.gender = userData.gender;
            state.avatar = userData.avatar;
        })
        .addCase(updateUserInfoAction.fulfilled, (state, action) => {
            state.status = "sucessfulUpdate";
        });
    },
});

const selectIsLoggedIn = (state) => state.currentUser.isLoggedIn;

const loginAction = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
      await loginUser(email, password);
      return;
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
      const response = await getUserData();
      return response.data;
    }
);

const updateUserInfoAction = createAsyncThunk(
    "user/updateUserInfo",
    async (object) => {
        await updateUserInfo(object);
        return;
    }
);

const deregisterUserAction = createAsyncThunk(
    "user/deregisterUser",
    async () => {
        await deregisterUser;
    }
)

export { loginAction, logoutAction, registerAction, selectIsLoggedIn, fetchUserDataAction, updateUserInfoAction, deregisterUserAction };

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;