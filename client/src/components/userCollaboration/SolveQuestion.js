import "./solveQuestion.css";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SolveQuestion = () => {

  const matchingState = useSelector(state => state.matching);

  useEffect(() => {

  }, []);

  return (
    <div className="solve-question-page">
      <Loading/>
      {JSON.stringify(matchingState)}
    </div>
  )
}

export default SolveQuestion;