import "./infoBar.css";
import LanguageSelector from "./LanguageSelector";

const InfoBar = ({ matchInfo, selectedLanguage, onLanguageChange }) => {
    const users = matchInfo.users

    return (
        <div className="info-bar">
            <div className="match-info">{`MatchID: ${matchInfo.id}`}</div>
            <div className="language-selector">
                <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
            </div>
            <div className="match-users">
                <p>Match Participants</p>
                <ul>
                    {users.map((user, index) => (
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