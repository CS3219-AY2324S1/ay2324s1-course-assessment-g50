import { useState, useRef, useEffect } from "react";
import "./codeEditor.css";
import Console from "./Console";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const languageDict = {
    "java": "//",
    "python": "#",
    "javascript": "//"
};

const CodeEditor = ({ language, handleEditorDidMount }) => {
    const editorRef = useRef();

    const [isShowConsole, setIsShowConsole] = useState(false);

    // Handle Console state change
    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    // Handle editor code submission
    const handleSubmitCode = () => {
        console.log(editorRef.current.getValue());
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
                <p>Result:</p>
            </div>
            <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole} />
        </div>
    );
}


export default CodeEditor;