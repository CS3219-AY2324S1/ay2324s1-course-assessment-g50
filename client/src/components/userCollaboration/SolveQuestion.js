import "./solveQuestion.css";
import LoadingView from "./viewComponents/LoadingView";
import CollabView from "./viewComponents/CollabView";
import AttemptView from "./viewComponents/AttemptView";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AlertNotification from "../../services/alert.service";

/* Component which shows the question details page be it for attempt or collaboration view */
const SolveQuestion = () => {
  const matchingStatus = useSelector(state => state.matching.status);
  const errorInfo = useSelector(state => state.matching.errorInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAccessedFromHistory = false, questionName = null } = location.state || {};
  const [isSuccessfulMatch, setIsSucessfulMatch] = useState(false);
  
  useEffect(() => {
    if (matchingStatus === 'sucessfullyConnected') {
      setIsSucessfulMatch(true);
    } else if (matchingStatus === "failedConnection") {
      AlertNotification.error("Failed match: " + errorInfo).notify(dispatch);
    }
  }, [matchingStatus]);

  return (
    <div className="solve-question-page">
      { isSuccessfulMatch || isAccessedFromHistory
      ? isAccessedFromHistory ? <AttemptView questionName={questionName}/> : <CollabView/>
      : <LoadingView/>}
    </div>
  )
}

export default SolveQuestion;