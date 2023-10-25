import { useState, useRef, useEffect } from "react";
import "./codeEditor.css";
import Console from "./components/Console";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import InfoBar from "./components/InfoBar";

const serverWsUrl = "ws://localhost:8200";

const languageDict = {
    "java": "//",
    "python": "#",
    "javascript": "//"
};

const CodeEditor = (matchInfo) => {
    const doc = new Y.Doc();
    const editorRef = useRef();

    const [language, setLanguage] = useState("python");
    const [isShowConsole, setIsShowConsole] = useState(false);

    // Handle Console state change
    const handleShowConsole = (e) => {
        setIsShowConsole(!isShowConsole);
    }

    // Handle editor code change
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Code Collaboration part:
        const manacoText = doc.getText("manaco")
        const provider = new WebsocketProvider(serverWsUrl, "matchId", doc);
        const binding = new MonacoBinding(manacoText, editorRef.current.getModel(), new Set([editorRef.current]))
    }

    // Handle editor code submission
    const handleSubmitCode = () => {
        console.log(editorRef.current.getValue());
    }


    // Handle language change
    useEffect(() => {
        const languageText = doc.getText("language")

        languageText.observe(event => {
            setLanguage(languageText.toString());
        });
    }, [])

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value

        // Language Synchronize part:
        const languageText = doc.getText("language")
        const provider = new WebsocketProvider(serverWsUrl, "matchId", doc);
        languageText.delete(0, languageText.length);
        languageText.insert(0, newLanguage);
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
                    handleLanguageChange={handleLanguageChange}
                />
            </div>
        </div>
    );
}


export default CodeEditor;