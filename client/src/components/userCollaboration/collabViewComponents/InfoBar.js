import "./infoBar.css";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import WarningDialog from "../components/WarningDialog"
import QuestionSelector from "./QuestionSelector";

const InfoBar = ({ matchInfo, selectedLanguage, handleLanguageChange, selectedQuestion, handleQuestionChange }) => {
    const users = matchInfo.matchedUserInfo
    const [dialogIsOpen, setDialogIsOpen] = useState(false); 
    const [disableDialog, setDisableDialog] = useState(false);
    const [isSelection, setIsSelecting] = useState(false);

    const handleOnclick = () => {
        if (disableDialog && !isSelection) {
            // User agree to condition and opens selection options
            setIsSelecting(true)
            return
        } else if (disableDialog && isSelection) {
            // User selects a language to change to
            setDisableDialog(false)
            setIsSelecting(false)
            return
        }
        
        setDialogIsOpen(true)
    }

    // Close dialog and prevent from opening 
    const agree = (e) => {
        e.stopPropagation();
        setDialogIsOpen(false)
        setDisableDialog(true)
    }

    // Close dialog and reopen on next click
    const disagree = (e) => {
        e.stopPropagation();
        setDialogIsOpen(false)
    }

    return (
        <div className="info-bar-container">
            <div className="match-info">{`MatchID: ${matchInfo.matchId}`}</div>
            <div className="language-selector"  onClick={handleOnclick}>
                <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange}/>
                <QuestionSelector selectedQuestion={selectedQuestion} handleQuestionChange={handleQuestionChange}/>
                <WarningDialog dialogIsOpen={dialogIsOpen} disagree={disagree} agree={agree}/>
            </div>
            <div className="match-users">
                <p>Match Participants</p>
                <ul>
                    {users && users.map((user, index) => (
                        <li key={index}>
                            <img src={user.avatar} alt={user.nickname} />
                            <span>{user.nickname}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InfoBar;