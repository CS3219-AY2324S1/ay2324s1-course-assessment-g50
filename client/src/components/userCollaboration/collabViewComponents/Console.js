import "./console.css";
import { MdArrowDropUp } from "react-icons/md"

const Console = ({ handleSubmitCode, handleShowConsole, testCase, setTestCase }) => {


    return (
        <div className="console-container">
            <div className="show-console-button" onClick={handleShowConsole}>
                <p>Console</p>
                <MdArrowDropUp className="arrow-up-icon"/>
            </div>

            <textarea
                className="field"
                value={testCase}
                placeholder="Testcase to run"
                onChange={e => setTestCase(e.target.value)}
            />

            <button className="submit-code-button" onClick={handleSubmitCode}>
                Submit
            </button>
        </div>
    )
}

export default Console;