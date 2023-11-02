import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, fetchTotalQuestionCount, selectAllQuestions, selectFilters, } from "../../../reducers/questionSlice.js";
import UserAvatar from "../../user/userProfile/userAvatar.js";
import "../questions.css";
import ExpandableRow from "../expandable-row/expandable-row";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import QuestionFilterBar from "../question-filter/question-filter-bar.js";
import QuestionPageBar from "../question-filter/filter-componets/question-page-bar.js";

const QuestionTable = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.questions.status);
  const questions = useSelector(selectAllQuestions);
  const filters = useSelector(selectFilters);
  
  /* Try and retrieve data whenever page is rendered */
  useEffect(() => {
    if (status === 'idle' || status === 'outdated') {
      dispatch(fetchQuestions());
      dispatch(fetchTotalQuestionCount());
    }
  }, [status])

  /* Try and retrieve data whenever filters are updated */
  useEffect(() => {
    dispatch(fetchQuestions(filters));
  }, [filters.pageSize, filters.page, filters.complexity, filters.topicSlugs])

  return (
    <div className="post-form">
      <QuestionFilterBar />
      <div className="header">
        <p className="section-title">
          Question Table
        </p>
        <UserAvatar />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Complexity</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, i) => (
              <ExpandableRow question={q} row_num={i} key={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <QuestionPageBar />
    </div>
  );
};

export default QuestionTable;
