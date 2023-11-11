import React, { useState, useRef, useEffect } from "react";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const CodeBox = ({code, setCode, language, resetTrigger}) => {
    const editorRef = useRef();
    const handleEditorDidMount = (editor, monaco) => {
      editorRef.current = editor;
    }
    function handleEditorChange(value, event) {
      // here is the current value
      setCode(prev => {
        return {...prev, [language]: value}
      })
    }

    useEffect(() => {
      if (editorRef.current !== undefined) {
        editorRef.current.setValue(code[language] || '')
      }
    }, [language, resetTrigger])

    return (
        <Editor className="editor " height={400} defaultLanguage="python"
        defaultValue="#Type your code here`"
        language={language}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
            scrollBeyondLastLine: false,
            fontSize: "14px",
            minimap: {
                enabled: false,
            }
        }} />
  );
}

export default CodeBox;