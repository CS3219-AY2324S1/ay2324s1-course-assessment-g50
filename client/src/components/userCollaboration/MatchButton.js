import "./matchButton.css";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const MatchButton = () => {

  return (
    <div className="match-button-box">
      <Link className="links" to="/profile"> 
      <FaPlay className="icon"/>
      MATCH ME UP
      </Link>
    </div>
  )
}

export default MatchButton;