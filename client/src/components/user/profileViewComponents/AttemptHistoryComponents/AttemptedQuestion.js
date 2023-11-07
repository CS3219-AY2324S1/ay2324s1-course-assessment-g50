import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import "./attemptedQuestion.css";
import { useNavigate } from 'react-router-dom';

const AttemptedQuestion = ({ questionName, attemptDate }) => {
    const navigate = useNavigate();
    const handleQuestionOnClick = () => {
        navigate("/solve-question", { state: { isAccessedFromHistory: true }})
    }

    return (
        <TableRow sx={{ backgroundColor: "rgba(247, 248, 250, 0.3)" }} onClick={handleQuestionOnClick} hover={true}>
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