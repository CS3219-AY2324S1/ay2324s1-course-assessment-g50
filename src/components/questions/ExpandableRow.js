import React, { useState } from "react";
import { deleteQuestion } from "../../reducers/questionSlice";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./Questions.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const ExpandableRow = ({
  question: { title, description, category, complexity, id },
  row_num,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const rowColor = row_num % 2 === 0 ? "#FFFFFF" : "rgb(247 248 250)";

  return (
    <>
      <TableRow
        onClick={() => setOpen(!open)}
        hover
        sx={{ backgroundColor: rowColor }}
      >
        <TableCell align="left" className="colId">
          {row_num}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {title}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {category}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {complexity}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteQuestion(id));
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <p>{description}</p>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExpandableRow;
