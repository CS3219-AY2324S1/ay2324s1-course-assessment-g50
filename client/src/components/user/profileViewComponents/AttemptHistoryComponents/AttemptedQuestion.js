import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import "./attemptedQuestion.css";

const AttemptedQuestion = ({ questionName, attemptDate, savedCode, handleQuestionOnClick }) => {


    return (
        <TableRow sx={{ backgroundColor: "rgba(247, 248, 250, 0.3)" }} onClick={() => handleQuestionOnClick(savedCode)} hover={true}>
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