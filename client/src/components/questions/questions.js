import React from "react";
import QuestionForm from "./question-form/question-form";
import QuestionTable from "./question-table/question-table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCookie } from '../../reducers/userSlice';


const Question = () => {
  const dispatch = useDispatch();
  const validCookie = useSelector(selectCookie); 

  return (
    <div className="App">
      <QuestionForm />
      <QuestionTable />
    </div>
  );
};

export default Question;
