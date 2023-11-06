import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMessage, fetchMessages } from "../services/communication.service";

const initialState = {
    messages: [],
    status: "idle",
};

const userSlice = createSlice({
    name: "currentRoom",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addMessageAction.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(fetchMessageAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.messages = action.payload;
            })
    },
});

export const selectAllMessages = (state) => state.currentRoom.messages;

const addMessageAction = createAsyncThunk(
    "communication/addMessage",
    async (message) => {
        const response = await addMessage(message);
        return response.data;
    }
);

const fetchMessageAction = createAsyncThunk(
    "communication/fetchMessage",
    async () => {
        const response = await fetchMessages();
        return response.data
    }
)

export { addMessageAction };

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;