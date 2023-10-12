import { useNavigate } from "react-router-dom";
import "./loading.css";

const Loading = () => {
    const navigate = useNavigate();
    return (
        <div className="loading-page">
            <div className="loading-container">
            <span style={{"--i": 1}}></span>
            <span style={{"--i": 2}}></span>
            <span style={{"--i": 3}}></span>
            <span style={{"--i": 4}}></span>
            <span style={{"--i": 5}}></span>
            <span style={{"--i": 6}}></span>
            <span style={{"--i": 7}}></span>
            <span style={{"--i": 8}}></span>
            <span style={{"--i": 9}}></span>
            <span style={{"--i": 10}}></span>
            <span style={{"--i": 11}}></span>
            <span style={{"--i": 12}}></span>
            <span style={{"--i": 13}}></span>
            <span style={{"--i": 14}}></span>
            <span style={{"--i": 15}}></span>
            <span style={{"--i": 16}}></span>
            <span style={{"--i": 17}}></span>
            <span style={{"--i": 18}}></span>
            <span style={{"--i": 19}}></span>
            <span style={{"--i": 20}}></span>
            <span style={{"--i": 21}}></span>
            <span style={{"--i": 22}}></span>
            <span style={{"--i": 23}}></span>
            <span style={{"--i": 24}}></span>
            <div className="cancel-matching-button" onClick={() => navigate("/")}><p>Cancel Matching</p></div>
            </div>
        </div>
    )
}

export default Loading;