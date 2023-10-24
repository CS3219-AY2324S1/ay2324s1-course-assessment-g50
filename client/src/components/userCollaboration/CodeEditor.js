import { useState, useRef, useEffect } from "react";
import "./codeEditor.css";
import Console from "./components/Console";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import InfoBar from "./components/InfoBar";

const serverWsUrl = "ws://localhost:8200";

console.log(serverWsUrl)

const languageDict = {
    "java": "//",
    "python": "#",
    "javascript": "//"
};

const CodeEditor = (matchInfo) => {
    const editorRef = useRef();
    const [language, setLanguage] = useState("python");

    const [isShowConsole, setIsShowConsole] = useState(false);

    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Code Collaboration part:
        const doc = new Y.Doc();
        const provider = new WebsocketProvider(serverWsUrl, "matchId", doc)
        const type = doc.getText("manaco")
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]))
    }
    const handleSubmitCode = () => {
        console.log(editorRef.current.getValue());
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    return (
        <div className="code-editor-container">
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
            <div className="editor-info-container">
                <InfoBar
                    matchInfo={matchInfo}
                    selectedLanguage={language}
                    onLanguageChange={handleLanguageChange}
                />
            </div>
        </div>
    );
}


export default CodeEditor;