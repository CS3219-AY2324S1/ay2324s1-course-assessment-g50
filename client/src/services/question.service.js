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

const isFormValid = (formData) => {
  const noneEmpty = Object.values(formData).every(
    (field) => field !== null && field !== ""
  );
  const hasCat = formData.categories.length > 0;
  const hasDesc = formData
    .description
    .replace(/<(?!img\s)[^>]*>/g, "")
    .trim()
    .length !== 0;

  isValid = noneEmpty && hasCat && hasDesc;
  if (!isValid) {
    const msg = "All fields must be filled";
    throw new Error(msg);
  }
};

export const addQuestionToRepo = async (formData) => {
  isFormValid(formData);
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data.data;
  } catch (error) {
    const msg = error.response.data.data || error.response.statusText;
    throw new Error(msg);
  }
};

// Delete a question
export const deleteQuestionFromRepo = async (id) => {
  console.log("delete: \n" + id);
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("There was an error deleting the question:", error);
    throw new Error(error.response.data.data);
  }
};

// Update a question
export const updateQuestionFromRepo = async (formData) => {
  isFormValid(formData);
  try {
    await axios.patch(`${baseUrl}/${formData._id}`, formData);
  } catch (error) {
    console.error("There was an error updating the question:", error);
    throw new Error(error.response.data.data);
  }
};

// Get questions
export const getQuestions = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data;
  } catch (error) {
    console.error("There was an error retrieving the questions:", error);
    throw new Error(error.response.data.data);
  }
};
