import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Component which shows the question details */
const SolveQuestion = () => {
  const matchingStatus = useSelector(state => state.matching.status);
  const navigate = useNavigate();
  
  const [isSuccessfulMatch, setIsSucessfulMatch] = useState(false);
  
  useEffect(() => {
    if (matchingStatus === 'sucessfullyConnected') {
      setIsSucessfulMatch(true);
    }
  }, [matchingStatus]);

  return (
    <div className="solve-question-page">
      { isSuccessfulMatch
      ? <CollabView/>
      : <LoadingView/> }
    </div>
  )
}

export default SolveQuestion;