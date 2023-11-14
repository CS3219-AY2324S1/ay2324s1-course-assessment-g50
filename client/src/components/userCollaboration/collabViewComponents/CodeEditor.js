import { useState } from "react";
import { updateCodeAttempt } from "../../../services/user.service.js";
import "./codeEditor.css";
import Console from "./Console";
import ConsoleResult from "./console-result.js";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { runCode } from "../../../services/sandbox.service";
import { useDispatch, useSelector } from "react-redux";
import AlertNotification from "../../../services/alert.service.js";

const CodeEditor = ({ language, handleEditorDidMount, getEditorCode, isReadMode}) => {
    const [isShowConsole, setIsShowConsole] = useState(false);
    const [result, setResult] = useState({});
    const [testCase, setTestCase] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const question = useSelector(state => state.matching.matchedQuestionDetails)

    // Handle Console state change
    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }
    console.log(isLoading)
    const handleSubmitCode = async () => {
        const editorCode = getEditorCode();

        //saves the code attempt
        updateCodeAttempt(question.title, language, editorCode);

        if (testCase === '') {
            AlertNotification.error("Please provide a test to run").notify(dispatch);
            console.log('empty')
            return
        }

        setIsShowConsole(true);
        
        if (!canSubmit) {
            const content = 'You have attempted to run code too soon. Please try again in a few seconds'
            const errObj = { isError: true, content }
            setResult(errObj)
            return
        }
        
        // Success
        setIsLoading(true)
        const solutionCode = question.solutionCode['python']
        const runInfo = { editorCode, language, testCase, solutionCode }
        let codeOutput;
        codeOutput = await runCode(runInfo);
        
        setResult(codeOutput)
        setIsLoading(false)

        // Disable button prevent server overload
        setCanSubmit(false);
        setTimeout(()=>setCanSubmit(true), 5000);
    }

    return (
        <div className="code-container">
            <div className="editor-container">
                <Editor className="editor" height="99%" defaultLanguage="python"
                    language={language}
                    onMount={handleEditorDidMount}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: "16px",
                        minimap: {
                            enabled: false,
                        },
                        readOnly: isReadMode,
                    }} />
            </div>
            <ConsoleResult isLoading={isLoading} isShowConsole={isShowConsole} result={result}/>
            <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole} 
                testCase={testCase} setTestCase={setTestCase}/>
        </div>
    );
}


export default CodeEditor;