import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const NonAdminRow = ({ 
	question: { title, description, categories, complexity, _id }, 
	row_num, 
	rowColor, 
}) => {
	const [open, setOpen] = useState(false);

	const showDetails = () => {
		setOpen(!open);
	}

	return (
		<>
			<TableRow onClick={showDetails} hover sx={{ backgroundColor: rowColor }}>
				<TableCell align="left" className="colId">
					{row_num + 1}
				</TableCell>
				<TableCell align="left" className="userCols" sx={{ fontSize: "16px" }}>
					{title}
				</TableCell>
				<TableCell align="left" className="userCols" sx={{ fontSize: "16px" }}>
					{categories.join(", ")}
				</TableCell>
				<TableCell align="left" className="userCols" sx={{ fontSize: "16px" }}>
					{complexity}
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

export default NonAdminRow;
