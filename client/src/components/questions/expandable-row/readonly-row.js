import React, { useState } from "react";
import { deleteQuestion } from "../../../reducers/questionSlice";
import Collapse from "@mui/material/Collapse";
import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./expandable-row.css";
import AlertNotification from "../../../services/alert.service";

const INFO_CLOSING_RULE = "Saved/Discard changes to minimise row";

const ReadOnlyRow = ({ 
	question: { title, description, categories, complexity, _id }, 
	row_num, 
	rowColor, 
	setReadOnly 
}) => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const del = (e) => {
		e.stopPropagation();
		dispatch(deleteQuestion(_id));
	};

	const changeToEditMode = () => {
		setReadOnly(false);
		AlertNotification.info(INFO_CLOSING_RULE).notify(dispatch);
	};

	return (
		<>
			<TableRow onClick={() => setOpen(!open)} hover sx={{ backgroundColor: rowColor }}>
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
					<IconButton color="primary" onClick={(e) => del(e)}>
						<DeleteIcon />
					</IconButton>
					<IconButton color="primary" onClick={changeToEditMode}>
						<EditIcon />
					</IconButton>
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

export default ReadOnlyRow;
