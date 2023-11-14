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
const baseUrl = "http://35.198.214.47:5000/sandbox";

const runCode = async (runInfo) => {
    try {
        const response = await axios.post(baseUrl, runInfo);
        const succcessObj = {isError: false, content: response.data.data}

        return succcessObj;
    } catch (error) {
        const errObj =  {isError: true, content: error.response.data.data};
        return errObj
    }
};

export { runCode }