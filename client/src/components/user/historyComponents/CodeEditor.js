import "./codeEditor.css";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useDispatch, useSelector } from "react-redux";

const CodeEditor = ({ language, handleEditorDidMount, isReadMode}) => {

    return (
        <div className="code-container-2">
            <Editor className="editor" height="100%" defaultLanguage="python"
                language={language}
                onMount={handleEditorDidMount}
                style={{ filter: 'sepia(0.4)' }}
                options={{
                    scrollBeyondLastLine: false,
                    fontSize: "16px",
                    minimap: {
                        enabled: false,
                    },
                    theme: 'hc-light',
                    readOnly: isReadMode,
                }} />
        </div>
    );
}


export default CodeEditor;