import "./solveQuestion.css";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SolveQuestion = () => {

  const matchingStatus = useSelector(state => state.matching.status);

  useEffect(() => {

  }, []);

  return (
    <div className="solve-question-page">
      {matchingStatus == 'loading' ? (<Loading/>) :
       matchingStatus == 'sucessfullyConnected' ? "✅" :
       matchingStatus == 'failedConnection' ? "⚠️" : null}
    </div>
  )
}

export default SolveQuestion;