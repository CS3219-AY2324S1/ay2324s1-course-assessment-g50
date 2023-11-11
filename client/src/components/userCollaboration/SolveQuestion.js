import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import AttemptView from "./viewComponents/AttemptView";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/* Component which shows the question details page be it for attempt or collaboration view */
const SolveQuestion = () => {
  const matchingStatus = useSelector(state => state.matching.status);
  const location = useLocation();
  const { isAccessedFromHistory = false, questionName = null } = location.state || {};
  const [isSuccessfulMatch, setIsSucessfulMatch] = useState(false);
  
  useEffect(() => {
    if (matchingStatus === 'sucessfullyConnected') {
      setIsSucessfulMatch(true);
    }
  }, [matchingStatus]);

  return (
    <div className="solve-question-page">
      { isSuccessfulMatch || isAccessedFromHistory
      ? isAccessedFromHistory ? <AttemptView questionName={questionName}/> : <CollabView/>
      : <LoadingView/> }
    </div>
  )
}

export default SolveQuestion;