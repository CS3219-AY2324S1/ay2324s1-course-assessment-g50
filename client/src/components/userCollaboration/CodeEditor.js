import { useState, useRef, useEffect } from "react";
import "./codeEditor.css";
import Console from "./components/Console";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const supportedLanguages = ["java", "python", "javascript"];

const languageDict = {
    "java":"//",
    "python":"#",
    "javascript":"//"
};

const CodeEditor = () => {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState("python");

    const [isShowConsole, setIsShowConsole] = useState(false);

    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }
    const handleSubmitCode = () => {
        console.log(editorRef.current.getValue());
    }

    return (
    <div className="code-editor-container">
        <div className="editor-container">
            <Editor className="editor" height="99%" defaultLanguage="python" 
            defaultValue={`#Type your code here`}
            language={language}
            onMount={handleEditorDidMount}
            options={{
                scrollBeyondLastLine:false,
                fontSize:"14px",
                minimap: {
                    enabled: false,
                }
            }}/>
        </div>
        <div className={ isShowConsole ? 'console-result visible' : 'console-result'}>
            <p>Result:</p>
        </div>
        <Console handleSubmitCode={handleSubmitCode} handleShowConsole={handleShowConsole}/>
    </div>
    );
}


export default CodeEditor;