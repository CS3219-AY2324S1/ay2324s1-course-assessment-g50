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
const baseUrl = "http://peerprepg50:5000/questions";

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

  const isValid = noneEmpty && hasCat && hasDesc;
  if (!isValid) {
    const msg = "All fields must be filled";
    throw new Error(msg);
  }
};

const isCodePresent = (optionalFields) => {
  const hasSolution = optionalFields.solutionCode.python !== ""
  const hasTemplates = Object.values(optionalFields.templateCode).every(
    (field) => field !== null && field !== ""
  );
  if (!hasSolution || !hasTemplates) {
    const msg = "Please fill in the solution and template code for all languages";
    throw new Error(msg);
  }
}

const buildFilteredURL = (filters) => {
  const queryParams = new URLSearchParams();
  for (const key in filters) {
      if (filters[key]) {
          queryParams.append(key, filters[key]);
      }
  }
  const queryString = queryParams.toString();
  const filteredURL = queryString ? `?${queryString}` : '';
  return filteredURL;
}

export const addQuestionToRepo = async (formData, optionalFields) => {
  isFormValid(formData);
  isCodePresent(optionalFields)
  console.log(optionalFields)
  try {
    const fullForm = {...formData, ...optionalFields};
    const response = await axios.post(baseUrl, fullForm);
    return response.data.data;
  } catch (error) {
    const msg = error.response.data.data || error.response.statusText;
    throw new Error(msg);
  }
};

// Delete a question
export const deleteQuestionFromRepo = async (id) => {
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
export const getQuestions = async (filters = {}) => {
  try {
    const filteredURL = buildFilteredURL(filters);
    const response = await axios.get(baseUrl + filteredURL);
    return response.data.data;
  } catch (error) {
    console.error("There was an error retrieving the questions:", error);
    throw new Error(error.response.data.data);
  }
};

export const getTotalQuestionCount = async () => {
  try {
    const response = await axios.get(baseUrl + "/count");
    return response.data.data;
  } catch (error) {
    console.error("There was an error retrieving the question count: ", error);
    throw new Error(error.response.data.data);
  }
}

// For retrieving question details for both history and collaboration
export const retrieveQuestionDetails = async (questionName) => {
  try {
    console.log(questionName)
    const response = await axios.get(baseUrl + "/" + questionName);
    return response.data;

  } catch (error) {
    throw new Error(error);
  }
}