import React, { useState, useRef } from "react";
import { deleteQuestion } from "../../../reducers/questionSlice";
import Collapse from "@mui/material/Collapse";
import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./expandable-row.css";
import AlertNotification from "../../../services/alert.service";

const INFO_CLOSING_RULE = "Saved/Discard changes to minimise row";
const NOT_AUTHORISED = "You are not authorized on to perform this action";

const ReadOnlyRow = ({ 
	question: { title, description, categories, complexity, _id }, 
	row_num, 
	rowColor, 
	setReadOnly 
}) => {
	const [open, setOpen] = useState(false);
	const editButton = useRef(null);
	const deleteButton = useRef(null);
	const dispatch = useDispatch();
	const userRole = useSelector(state => state.currentUser.userRole);

	const del = async (e) => {
		e.stopPropagation();
		try {
			await dispatch(deleteQuestion(_id)).unwrap();
		} catch (err) {
			AlertNotification.error(err.message).notify(dispatch);
		}
	};

	const showDetails = (event) => {
		if (editButton.current.contains(event.target) || deleteButton.current.contains(event.target)) {
			return;
		} else {
			setOpen(!open);
		}
	}

	const changeToEditMode = () => {
		console.log(userRole);
		if (userRole === "admin") {
			setReadOnly(false);
			AlertNotification.info(INFO_CLOSING_RULE).notify(dispatch);
		} else {
			AlertNotification.error(NOT_AUTHORISED).notify(dispatch);
		}
	};

	return (
		<>
			<TableRow onClick={showDetails} hover sx={{ backgroundColor: rowColor }}>
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
					<IconButton ref={deleteButton} color="primary" onClick={(e) => del(e)}>
						<DeleteIcon />
					</IconButton>
					<IconButton ref={editButton} color="primary" onClick={changeToEditMode}>
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
