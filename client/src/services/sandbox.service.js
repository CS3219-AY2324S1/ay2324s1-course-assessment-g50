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

const runCode = async (code, language) => {
    try {
        const response = await axios.post(baseUrl, { code, language });
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
        if (error.response.data.code === 400) {
          console.log(error.response.data.data)
          return error.response.data.data;
        } else {
          throw new Error("logging error");
        }
    }
};

export { runCode }