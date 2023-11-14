import "./matchButton.css";
import { FaPlay } from "react-icons/fa";
import MatchingDialog from "./MatchingDialog";
import { useState } from "react";
import { getQuestionTopics } from "../../../services/question.service";
import { fetchQuestionTopicsAction } from "../../../reducers/questionSlice";
import { useDispatch } from "react-redux";

/* Button component on the question page to allow users to start collaboration */
const MatchButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onClickDialogue = () => {
    dispatch(fetchQuestionTopicsAction());
    setDialogIsOpen(true);
  }

  return (
    <div>
      <div className="match-button-box" onClick={onClickDialogue}>
        <FaPlay className="icon"/>
        <p>START CODING</p>
      </div>
      <MatchingDialog dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen}/>
    </div>
    
  )
}

export default MatchButton;