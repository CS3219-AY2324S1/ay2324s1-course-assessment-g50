import { Paper, Table, TableContainer, Pagination } from "@mui/material";
import AttemptedQuestion from "./AttemptHistoryComponents/AttemptedQuestion";
import { fetchUserAttemptHistoryAction } from "../../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

/* Display view of the questions attempted by user */
const AttemptHistory = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    const attemptedQuestions = useSelector(state => state.currentUser.attemptedQuestionHistory);

    useEffect(() => {
        dispatch(fetchUserAttemptHistoryAction({ pageNumber }));
    }, []);


    return (
        <div className="info-table"> 
            <TableContainer component={Paper}>
                <Table>
                    {attemptedQuestions && attemptedQuestions.map((question, index) => 
                        <AttemptedQuestion key={index} questionName={question.questionName} attemptDate={question.attemptDate}/>
                    )}
                </Table>
            </TableContainer>
            <Pagination
                onChange={(_, page) => setPageNumber(page)}
                color="primary"
            />
        </div>
    )
}

export default AttemptHistory;