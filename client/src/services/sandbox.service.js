import axios from "axios";

/* 
Question service interects with backend API -> saves to reducer
axios response: {
  ...
  data: {
    code: string,
    msg: string,
    data: Object,
  }
}
*/
const baseUrl = "http://localhost:5000/sandbox";

const runCode = async (runInfo) => {
    try {
        const response = await axios.post(baseUrl, runInfo);
        return response.data.data;
    } catch (error) {
        return error.response.data.data;
    }
};

export { runCode }