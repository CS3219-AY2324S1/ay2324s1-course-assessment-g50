import axios from "axios";



//Insert the matching route here
const baseUrl = "";

const questionServiceUrl = "http://localhost:5000/questions";

const matchWithUser = async () => {
  try {
    return axios.get(baseUrl);
  } catch (error) {
    throw new Error(error);
  }
};

const retrieveQuestionDetails = async (questionID) => {
  try {
    console.log(questionID);
    const response = await axios.get(questionServiceUrl + "/" + questionID);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export { matchWithUser, retrieveQuestionDetails };