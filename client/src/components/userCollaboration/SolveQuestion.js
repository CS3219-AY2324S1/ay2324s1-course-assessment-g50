import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/* Component which shows the question details */
const SolveQuestion = ({ isOpenedFromHistory = false }) => {
  const matchingStatus = useSelector(state => state.matching.status);
  const location = useLocation();
  const { isAccessedFromHistory } = location.state;
  
  const [isSuccessfulMatch, setIsSucessfulMatch] = useState(false);
  
  useEffect(() => {
    if (matchingStatus === 'sucessfullyConnected') {
      setIsSucessfulMatch(true);
    }
  }, [matchingStatus]);

  return (
    <div className="solve-question-page">
      { isSuccessfulMatch || isAccessedFromHistory
      ? <CollabView/>
      : <LoadingView/> }
    </div>
  )
}

export default SolveQuestion;