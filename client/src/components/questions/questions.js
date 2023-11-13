import React from "react";
import QuestionTable from "./question-table";
import MatchButton from "../userCollaboration/components/MatchButton";

const Question = () => {
  return (
    <div className="question-page">
      <QuestionTable />
      <MatchButton/>
    </div>
  );
};

export default Question;
