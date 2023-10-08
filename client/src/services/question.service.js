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
const baseUrl = "http://localhost:8000/questions";

export const addQuestionToRepo = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.data)
  }

};

// Delete a question
export const deleteQuestionFromRepo = async (id) => {
  console.log("delete: \n" + id);
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("There was an error deleting the question:", error);
  }
};

// Update a question
export const updateQuestionFromRepo = async (id) => {
  console.log("delete: \n" + id);
  try {
    await axios.patch(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("There was an error deleting the question:", error);
  }
};

// Get questions
export const getQuestions = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data;
  } catch (error) {
    console.error("There was an error retrieving the questions:", error);
  }
};
