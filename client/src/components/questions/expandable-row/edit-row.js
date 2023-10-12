import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import "./expandable-row.css";
import { MultipleSelect, SingleSelect } from "../question-form/multi-select";
import RichText from "../question-form/rich-text";
import AlertNotification from "../../../services/alert.service";
import { updateQuestion } from "../../../reducers/questionSlice";

const WARNING_DISCARD_UNSAVED = "Unsaved changes have been discarded";
const NOTICE_SUCCESS = "Changes saved";

const EditRow = ({ question, row_num, rowColor, setReadOnly }) => {
	const dispatch = useDispatch();

	// Send warning and set to readOnly
	const discard = () => {
		AlertNotification.warning(WARNING_DISCARD_UNSAVED).notify(dispatch);
		setReadOnly(true);
	};

	// Set form to empty only on success
	const save = async () => {
		try {
			await dispatch(updateQuestion(formData)).unwrap();
			AlertNotification.success(NOTICE_SUCCESS).notify(dispatch);
			setReadOnly(true);
		} catch (err) {
			AlertNotification.error(err.message).notify(dispatch);
		}
	};

	// @Todo: Extract into custom hook (also used in question-form)
	const [formData, setFormData] = useState(question);
	const { title, categories, description, complexity } = formData;
	const onDescriptionChange = (value) => {
		return setFormData({ ...formData, description: value });
	};

	// Update the state with the selected values
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<TableRow sx={{ backgroundColor: rowColor }}>
				<TableCell align="left" className="colId">
					{row_num + 1}
				</TableCell>
				<TableCell align="left" className="colOthers" sx={{}}>
					<input className="textbox" type="text" name="title" placeholder="Title *" value={title} onChange={onChange} />
				</TableCell>
				<TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
					<MultipleSelect categories={categories} onChange={onChange} />
				</TableCell>
				<TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
					<SingleSelect complexity={complexity} onChange={onChange} className="textbox" />
				</TableCell>
				<TableCell align="left" className="colOthers" sx={{ fontSize: "16px" }}>
					<IconButton color="primary" onClick={save}>
						<DoneIcon />
					</IconButton>
					<IconButton color="primary" onClick={discard}>
						<CloseIcon />
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={5}>
					<Collapse in={true} timeout="auto" unmountOnExit>
						<RichText value={description} setValue={onDescriptionChange} />
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default EditRow;
