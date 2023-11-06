import axios from "axios";

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
const baseUrl = "http://localhost:5000/messages";

export const addMessage = async (message) => {
    try {
        const response = await axios.post(baseUrl, message);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Fail to add new message");
    }
};

export const fetchMessages = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Fail to get messages");
    }
}

