import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AttemptedQuestion = () => {
    return (
        <TableRow sx={{ backgroundColor: "rgba(247, 248, 250, 0.3)" }}>
            <TableCell sx={{ fontSize: "18px" , fontWeight: 700}}>
                LinkedList
            </TableCell>
            <TableCell sx={{ fontSize: "18px" , fontWeight: 600}}>
                28 Dec 2023
            </TableCell>
        </TableRow>
    )
}

export default AttemptedQuestion;