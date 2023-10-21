import "./console.css";
import { MdArrowDropUp } from "react-icons/md"

const Console = ({ handleSubmitCode, handleShowConsole }) => {


    return (
        <div className="console-container">
            <div className="show-console-button" onClick={handleShowConsole}>
                <p>Console</p>
                <MdArrowDropUp className="arrow-up-icon"/>
            </div>

            <div className="submit-code-button" onClick={handleSubmitCode}>
                <p>Submit</p>
            </div>
        </div>
    )
}

export default Console;