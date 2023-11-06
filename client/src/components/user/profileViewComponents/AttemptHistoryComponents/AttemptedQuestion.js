import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AttemptedQuestion = ({ questionName, attemptDate }) => {
    return (
        <TableRow sx={{ backgroundColor: "rgba(247, 248, 250, 0.3)" }}>
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