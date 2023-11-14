import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { retrieveQuestionDetailsAction } from "../../reducers/matchingSlice";
import { fetchQuestions } from "../../reducers/questionSlice";
import { updateUserAttemptHistory } from "../../services/user.service";

/* Component which shows the question details page be it for attempt or collaboration view */
const SolveQuestion = () => {
  const matchingStatus = useSelector(state => state.matching.status);
  const [isSuccessfulMatch, setIsSucessfulMatch] = useState(false);

  const questionArr = useSelector(state => state.questions.questions);
  const question = useSelector(state => state.matching.matchedQuestionDetails);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (matchingStatus === 'sucessfullyConnected') {
      setIsSucessfulMatch(true);

      // Get matched question here and pass down to CollabView
      dispatch(fetchQuestions());
      dispatch(retrieveQuestionDetailsAction({ questionName:questionArr[0].title }));
    }
  }, [matchingStatus]);

  useEffect(() => {
    if (question) {
      updateUserAttemptHistory(question.title, "attempt");
    }
  }, [question])

  return (
    <div className="solve-question-page">
      { isSuccessfulMatch && question
      ? <CollabView question={question}/>
      : <LoadingView/> }
    </div>
  )
}

export default SolveQuestion;