import { v4 as uuidv4 } from "uuid";

// Add a new question (to questions object and to localStorage)
export const addQuestionToRepo = (questionData) => {
  const questionRepo = getQuestions().data;
  const id = uuidv4();

  questionData.id = id;
  questionRepo.push(questionData);

  localStorage.setItem("questions", JSON.stringify(questionRepo));
  return { data: questionData };
};

// Delete a question
export const deleteQuestionFromRepo = (id) => {
  var questionRepo = getQuestions().data;
  questionRepo = questionRepo.filter((q) => q.id !== id);
  localStorage.setItem("questions", JSON.stringify(questionRepo));

  return { data: questionRepo };
};

// Get questions (simulates response promise)
export const getQuestions = () => {
  const questionRepo = JSON.parse(localStorage.getItem("questions") || "[]");
  return { data: questionRepo };
};