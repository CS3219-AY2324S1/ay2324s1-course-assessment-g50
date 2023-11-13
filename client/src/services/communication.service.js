import axios from "axios";
import { chatbaseUrl } from "../../../urls";

/* 
Message service interects with backend API -> saves to reducer
axios response: {
  ...
  data: {
    code: string,
    msg: string,
    data: Object,
  }
}
*/
const baseUrl = chatbaseUrl;

export const addMessage = async (message) => {
    try {
        const response = await axios.post(baseUrl + "/messages/", message);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Fail to add new message");
    }
};

export const fetchMessages = async (conversationId) => {
    try {
        const response = await axios.get(baseUrl + `/messages/${conversationId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Fail to get messages with conversation ID ${conversationId}`);
    }
};

export const addConversation = async (conversation) => {
    try {
        const response = await axios.post(baseUrl + "/conversations", conversation);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error, "Fail to add conversation");
    }
}

export const fetchConversations = async (matchId) => {
    try {
        const response = await axios.get(`${baseUrl}/conversations/${matchId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get conversation");
    }
};