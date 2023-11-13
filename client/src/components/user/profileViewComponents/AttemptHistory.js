import { Paper, Table, TableContainer, Pagination } from "@mui/material";
import AttemptedQuestion from "./AttemptHistoryComponents/AttemptedQuestion";
import { fetchUserAttemptHistoryAction, fetchUserAttemptHistoryPageCountAction } from "../../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./attemptHistory.css";
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

/* Display view of the questions attempted by user */
const AttemptHistory = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const attemptedQuestions = useSelector(state => state.currentUser.attemptedQuestionHistory);
    const attemptedQuestionCount = useSelector(state => state.currentUser.attemptedQuestionHistoryPageCount); 

    //Retrieves the total number of pages possible for user history
    useEffect(() => {
        dispatch(fetchUserAttemptHistoryPageCountAction());
    }, []);

    // Sets the total number of pages of questions
    useEffect(() => {
        setPageCount(Math.ceil(attemptedQuestionCount / ITEMS_PER_PAGE));
    }, [attemptedQuestionCount])

    //lazy fetching of attempted questions, only fetches 8 items at one go
    useEffect(() => {
        dispatch(fetchUserAttemptHistoryAction({ pageNumber }));
    }, [pageNumber]);

    //use to navigate to attempt and retrieve past attempts 
    const handleQuestionOnClick = (questionName) => {
        navigate("/solve-question", { state: { isAccessedFromHistory: true, questionName: questionName}})
    }

    return (
        <div className="info-table attempt-history"> 
            <h2>Past Attempts</h2>
            <TableContainer component={Paper}>
                <Table>
                    {attemptedQuestions && attemptedQuestions.map((question, index) => 
                        <AttemptedQuestion key={index} questionName={question.questionName} attemptDate={question.attemptDate}
                        attemptStatus={question.attemptStatus} handleQuestionOnClick={handleQuestionOnClick}/>
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