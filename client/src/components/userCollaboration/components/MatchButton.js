import "./matchButton.css";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import MatchingDialog from "./MatchingDialog";
import { useState } from "react";

/* Button component on the question page to allow users to start collaboration */
const MatchButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div>
      <div className="match-button-box" onClick={() => setDialogIsOpen(true)}>
        <FaPlay className="icon"/>
        <p>START CODING</p>
      </div>
      <MatchingDialog dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen}/>
    </div>
    
  )
}

export default MatchButton;