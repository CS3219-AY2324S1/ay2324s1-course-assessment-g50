import "./pastAttempt.css";
import AttemptView from "./historyComponents/AttemptView";
import { useParams } from "react-router-dom";

/* Component which shows the past attempt of a user */
const PastAttempt = () => {
  const { questionName } = useParams()
  console.log(questionName);

  return (
    <div className="solve-question-page">
      <AttemptView questionName={questionName}/> 
    </div>
  )
}

export default PastAttempt;