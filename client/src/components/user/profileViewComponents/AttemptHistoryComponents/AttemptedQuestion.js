import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import "./attemptedQuestion.css";

const AttemptedQuestion = ({ questionName, attemptDate, attemptStatus, handleQuestionOnClick }) => {

    return (
        <TableRow sx={{ backgroundColor: "rgba(247, 248, 250, 0.3)" }} onClick={() => handleQuestionOnClick(questionName)} hover={true}>
            <TableCell sx={{ fontSize: "18px" , fontWeight: 700}}>
                {questionName}
            </TableCell>
            <TableCell sx={{ fontSize: "18px" , fontWeight: 600}}>
                {attemptDate}
            </TableCell>
        </TableRow>
    )
}

export default AttemptedQuestion;