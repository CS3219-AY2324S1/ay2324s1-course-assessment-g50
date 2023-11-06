import { Paper, Table, TableContainer, Pagination } from "@mui/material";
import AttemptedQuestion from "./AttemptHistoryComponents/AttemptedQuestion";
import { fetchUserAttemptHistoryAction, fetchUserAttemptHistoryPageCountAction } from "../../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./attemptHistory.css";

/* Display view of the questions attempted by user */
const AttemptHistory = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const dispatch = useDispatch();
    const attemptedQuestions = useSelector(state => state.currentUser.attemptedQuestionHistory);
    const attemptedQuestionCount = useSelector(state => state.currentUser.attemptedQuestionHistoryPageCount); 

    //get number of pages possible and then render about 8 items per page
    //Always send the 

    //Retrieves the total number of pages possible for user history
    useEffect(() => {
        dispatch(fetchUserAttemptHistoryPageCountAction());
    }, []);

    useEffect(() => {
        setPageCount(Math.ceil(attemptedQuestionCount / 8));
    }, [attemptedQuestionCount])

    //lazy fetching of attempted questions, only fetches 8 items at one go
    useEffect(() => {
        dispatch(fetchUserAttemptHistoryAction({ pageNumber }));
    }, [pageNumber]);


    return (
        <div className="info-table attempt-history"> 
            <TableContainer component={Paper}>
                <Table>
                    {attemptedQuestions && attemptedQuestions.map((question, index) => 
                        <AttemptedQuestion key={index} questionName={question.questionName} attemptDate={question.attemptDate}/>
                    )}
                </Table>
            </TableContainer>
            <Pagination className="pagination"
                count={pageCount}
                boundaryCount={0}
                defaultpage={1}
                onChange={(_, page) => setPageNumber(page)}
                color="primary"
                siblingCount={1}
            />
        </div>
    )
}

export default AttemptHistory;