import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, selectAllQuestions,} from "../../../reducers/questionSlice.js";
import { loginAction, selectCookie } from "../../../reducers/userSlice";
import UserAvatar from "../../user-profile-manager/userAvatar";
import "../questions.css";
import ExpandableRow from "../expandable-row/expandable-row";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const QuestionTable = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.questions.status);
  const questions = useSelector(selectAllQuestions);
  const validCookie = useSelector(selectCookie); 

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestions());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [validCookie])

  return (
    <div className="post-form">

      <div className="header">
        <p className="section-title" align="left">
          Question Table
        </p>
        <UserAvatar/>
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
    </div>
  );
};

export default QuestionTable;
