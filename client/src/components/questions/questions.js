import React from "react";
import QuestionForm from "./question-form/question-form";
import QuestionTable from "./question-table/question-table";

const Question = () => {
  return (
    <div className="App">
      <QuestionForm />
      <QuestionTable />
    </div>
  );
};

export default Question;
