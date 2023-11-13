import { useState } from "react";
import { updateCodeAttempt } from "../../../services/user.service.js";
import "./codeEditor.css";
import Console from "./Console";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { runCode } from "../../../services/sandbox.service";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import AlertNotification from "../../../services/alert.service.js";

const Spinner = () => {
    return (                    
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}

const CodeEditor = ({ language, handleEditorDidMount, getEditorCode, setUserCode, isReadMode}) => {
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

    function handleEditorChange(value, event) {
        // here is the current value
        setUserCode(prev => {
          return {...prev, [language]: value}
        })
        console.log('changed')
      }

    const handleSubmitCode = async () => {
        const editorCode = getEditorCode();

        //saves the code attempt
        updateCodeAttempt(question.title, language, editorCode);

        if (testCase === '') {
            AlertNotification.error("Please provide a test to run").notify(dispatch);
            return
        }

        setIsShowConsole(true);
        
        let result;
        if (canSubmit) {
            setIsLoading(true)
            const solutionCode = question.solutionCode['python']
            const runInfo = { editorCode, language, testCase, solutionCode }
            const codeOutput = await runCode(runInfo);
            setResult(codeOutput)
            setIsLoading(false)

            // Disable button prevent server overload
            setCanSubmit(false);
            setTimeout(()=>setCanSubmit(true), 5000);
        } else {
            result = 'You have attempted to run code too soon. Please try again in a few seconds'
        }
    }

    return (
        <div className="code-container">
            <div className="editor-container">
                <Editor className="editor" height="99%" defaultLanguage="python"
                    language={language}
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: "16px",
                        minimap: {
                            enabled: false,
                        },
                        readOnly: isReadMode,
                    }} />
            </div>
            <div className={isShowConsole ? 'console-result visible' : 'console-result'}>
                { isLoading ? <Spinner /> : 
                    <>
                        <p>{'Status: ' + result.status}</p>
                        <p>{'Output:\n' + result.output}</p>
                        <p>{'Expected:\n' + result.expected}</p>
                    </>
                }
            </div>
            <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole} 
                testCase={testCase} setTestCase={setTestCase}/>
        </div>
    );
}


export default CodeEditor;