import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addMessage,
    fetchMessages,
    fetchConversations,
} from "../services/communication.service";

const initialState = {
    messages: [],
    conversation: null,
    status: "idle",
};

const communicationSlice = createSlice({
    name: "communication",
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
            .addCase(fetchConversationsAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.conversation = action.payload;
            });
    },
});

export const selectAllMessages = (state) => state.communication.messages;
export const selectCurrentConversation = (state) =>state.communication.conversation;

const addMessageAction = createAsyncThunk(
    "communication/addMessage",
    async (message) => {
        const response = await addMessage(message);
        return response.data;
    }
);

const fetchMessageAction = createAsyncThunk(
    "communication/fetchMessage",
    async (conversationId) => {
        const response = await fetchMessages(conversationId);
        return response.data;
    }
);

const fetchConversationsAction = createAsyncThunk(
    "communication/fetchConversations",
    async (matchId) => {
        const response = await fetchConversations(matchId);
        return response.data;
    }
);

export {
    addMessageAction,
    fetchMessageAction,
    fetchConversationsAction,
};

export const { resetStatus } = communicationSlice.actions;

export default communicationSlice.reducer;