import React, { useState } from "react";
import { deleteQuestion } from "../../../reducers/questionSlice";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./expandable-row.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ExpandableRow = ({
  question: { title, description, categories, complexity, _id },
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
          {row_num + 1}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {title}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {categories.join(", ")}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          {complexity}
        </TableCell>
        <TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteQuestion(_id));
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ReactQuill value={description} theme="bubble" readOnly={true} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExpandableRow;
