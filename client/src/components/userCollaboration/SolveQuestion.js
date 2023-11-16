import "./solveQuestion.css";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../../services/alert.service";

const SolveQuestion = () => {

  const matchingState = useSelector(state => state.match);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (matchingState.status === "failedConnection") {
    console.log(matchingState);
    AlertNotification.error(`Failed match: ${matchingState.error}`).notify(dispatch);
    navigate('/');
  }

  useEffect(() => {

  }, []);

  return (
    <div className="solve-question-page">
      {matchingState.status === "successfullyConnected" ? JSON.stringify(matchingState) : <Loading />}
    </div>
  )
}

export default SolveQuestion;