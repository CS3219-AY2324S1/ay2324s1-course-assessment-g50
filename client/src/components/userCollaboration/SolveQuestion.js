import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/* Component which shows the question details page be it for attempt or collaboration view */
const SolveQuestion = () => {
  const matchingStatus = useSelector(state => state.matching.status);
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