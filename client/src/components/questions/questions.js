import React from "react";
import QuestionForm from "./question-form/question-form";
import QuestionTable from "./question-table/question-table";
import MatchButton from "../userCollaboration/MatchButton";

const Question = () => {
  return (
    <div className="question-page">
      <QuestionForm />
      <QuestionTable />
      <MatchButton/>
    </div>
  );
};

export default Question;
