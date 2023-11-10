import { useState } from "react";
import "./codeEditor.css";
import Console from "./Console";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { runCode } from "../../../services/sandbox.service";

const CodeEditor = ({ language, handleEditorDidMount, getEditorCode, isReadMode}) => {
    const [isShowConsole, setIsShowConsole] = useState(false);
    const [result, setResult] = useState('');

    // Handle Console state change
    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    const handleSubmitCode = async () => {
        const editorCode = getEditorCode();
        const codeResponse = await runCode(editorCode, language);
        
        setResult(codeResponse)
        setIsShowConsole(true);
    }

    return (
        <div className="code-container">
            <div className="editor-container">
                <Editor className="editor" height="99%" defaultLanguage="python"
                    language={language}
                    onMount={handleEditorDidMount}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: "14px",
                        minimap: {
                            enabled: false,
                        },
                        readOnly: isReadMode,
                    }} />
            </div>
            <div className={isShowConsole ? 'console-result visible' : 'console-result'}>
                    <p>Result:</p>
                    <p>{`${result}`}</p>
            </div>
            <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole} />
        </div>
    );
}


export default CodeEditor;