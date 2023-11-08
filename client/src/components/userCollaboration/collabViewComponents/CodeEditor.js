import { useState } from "react";
import "./codeEditor.css";
import Console from "./Console";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { runCode } from "../../../services/sandbox.service";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const languageDict = {
    "java": "//",
    "python": "#",
    "javascript": "//"
};

const Spinner = () => {
    return (                    
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}
const CodeEditor = ({ language, handleEditorDidMount, getEditorCode }) => {
    const [isShowConsole, setIsShowConsole] = useState(false);
    const [result, setResult] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Handle Console state change
    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    const handleSubmitCode = async () => {
        const editorCode = getEditorCode();
        setIsShowConsole(true);
        
        let result;
        if (canSubmit) {
            setIsLoading(true)
            const codeOutput = await runCode(editorCode, language);
            setIsLoading(false)
            result = `Result:\n` + codeOutput

            // Disable button prevent server overload
            setCanSubmit(false);
            setTimeout(()=>setCanSubmit(true), 5000);
        } else {
            result = 'You have attempted to run code too soon. Please try again in a few seconds'
        }
        
        setResult(result)
    }

    return (
        <div className="code-container">
            <div className="editor-container">
                <Editor className="editor" height="99%" defaultLanguage="python"
                    defaultValue={`#Type your code here`}
                    language={language}
                    onMount={handleEditorDidMount}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: "14px",
                        minimap: {
                            enabled: false,
                        }
                    }} />
            </div>
            <div className={isShowConsole ? 'console-result visible' : 'console-result'}>
                { isLoading ? <Spinner /> : <p>{result}</p> }
            </div>
            <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole}/>
        </div>
    );
}


export default CodeEditor;