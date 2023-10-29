import "./collabView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import { retrieveQuestionDetailsAction } from "../../../reducers/matchingSlice";
import { fetchQuestions } from "../../../reducers/questionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/* Component which shows the question details */
const CollabView = () => {
    const questionArr = useSelector(state => state.questions.questions);
    const question = useSelector(state => state.matching.matchedQuestionDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    /* For testing purposes to retrieve questions data on refresh since no way to get to this page from the home page */
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [])

    useEffect(() => {
        if (questionArr.length > 0) {
            console.log(questionArr[0]._id)
            dispatch(retrieveQuestionDetailsAction({ questionID:questionArr[0]._id }));
        }
    }, [questionArr])

    return (
        <div className="question-details-component">
            {question && 
            <div className="question-details">
                <p className="question-title">{question.title}</p>
                <p className="question-complexity">{question.complexity}</p>
                <div  dangerouslySetInnerHTML={{ __html: question.description }} />
                <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
            </div>}
            <CodeEditor/>

        </div>
    )
}

export default CollabView;