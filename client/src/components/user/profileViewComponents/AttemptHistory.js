import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import AttemptedQuestion from "./AttemptHistoryComponents/AttemptedQuestion";

const AttemptHistory = () => {
    return (
        <div className="info-table"> 
            <TableContainer component={Paper}>
                <Table>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                    <AttemptedQuestion/>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AttemptHistory;