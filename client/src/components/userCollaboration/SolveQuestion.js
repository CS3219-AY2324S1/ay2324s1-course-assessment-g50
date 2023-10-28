import "./solveQuestion.css";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SolveQuestion = () => {

  const matchingStatus = useSelector(state => state.matching.status);
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  if (matchingStatus === 'sucessfullyConnected') {
    navigate('/question-testing');
  }

  return (
    <div className="solve-question-page">
      <Loading/>
    </div>
  )
}

export default SolveQuestion;