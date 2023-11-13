import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import "./attemptedQuestion.css";

const STATUS_COLOURS = {
    'attempt': "rgba(247, 248, 250, 0.3)",
    'success': "rgba(144, 238, 144, 0.3)",
    'failure': "rgba(240, 128, 128, 0.3)"
}

const AttemptedQuestion = ({ questionName, attemptDate, attemptStatus, handleQuestionOnClick }) => {

    return (
        <TableRow sx={{ backgroundColor: STATUS_COLOURS[attemptStatus] }} onClick={() => handleQuestionOnClick(questionName)} hover={true}>
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