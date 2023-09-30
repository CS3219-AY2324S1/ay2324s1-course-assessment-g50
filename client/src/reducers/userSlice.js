import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getUserData, updateUserInfo, deregisterUser } from "../services/user.service";

const initialState = {
    userId: null,
    nickname: null,
    birth: null,
    sign: null,
    gender: null,
    avatar: null,
    cookie: localStorage.getItem('loggedIn') === 'true',
    register: false,
    status: "idle",
};

const userSlice = createSlice({
    name: "loggedInUser",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(loginAction.fulfilled, (state, action) => {
            state.status = "sucessfulLogin";
            state.cookie = true;
            localStorage.setItem('loggedIn', 'true');
        })
        .addCase(loginAction.rejected, (state, action) => {
            state.status = "failedLogin";
            state.cookie = false;
        })
        .addCase(registerAction.fulfilled, (state, action) => {
            state.status = "sucessfulRegistration";
            state.register = true;
        })
        .addCase(fetchUserDataAction.fulfilled, (state, action) => {
            const userData = action.payload;
            // const newState = {...state,
            //     userId : userData.userId,
            //     nickname : userData.nickname,
            //     birth : userData.birth,
            //     sign : userData.sign,
            //     gender : userData.gender,
            //     avatar : userData.avatar
            // }

            // state = newState;

            state.status = "sucessfulFetch";
            state.userId = userData.userId;
            state.nickname = userData.nickname;
            state.birth = userData.birth;
            state.sign = userData.sign;
            state.gender = userData.gender;
            state.avatar = userData.avatar;
        });
    },
});

const selectCookie = (state) => state.loggedInUser.cookie;

const loginAction = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
      const response = await loginUser(email, password);
      return response.data;
    }
);

const registerAction = createAsyncThunk(
    "user/register",
    async ({email, password}) => {
        console.log(`email is ${email} and password is ${password}`);
        const response = await registerUser(email, password);
        return response.data;
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
    async () => {
        await updateUserInfo;
    }
);

const deregisterUserAction = createAsyncThunk(
    "user/deregisterUser",
    async () => {
        await deregisterUser;
    }
)

export { loginAction, registerAction, selectCookie, fetchUserDataAction, updateUserInfoAction, deregisterUserAction };

export default userSlice.reducer;