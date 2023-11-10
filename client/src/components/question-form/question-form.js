import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import RichText from "./rich-text.js";
import { MultipleSelect, SingleSelect } from "./multi-select.js";
import { addNewQuestion } from "../../reducers/questionSlice.js";
import AlertNotification from "../../services/alert.service.js";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import LanguageSelector from "../userCollaboration/collabViewComponents/LanguageSelector.js";
import TestCases from "./testcase-field.js";
import "./question-form.css";

// Empty Form (question has additional id field set after calling addQuestion)
const initialState = {
  title: "",
  categories: [],
  description: "~Question Description~",
  complexity: "",
};

const EMPTY_DESCRIPTION = "<p><br></p>";

const QuestionForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [testCases, setTestCases] = useState([]);
  
  const { title, categories, description, complexity } = formData;
  const dispatch = useDispatch();
  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  }

  const onDescriptionChange = (value) => {
    // If not form data's initial state
    if (value !== EMPTY_DESCRIPTION) {
      return setFormData({ ...formData, description: value });
    }
  };

  // Update the state with the selected values
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('why')
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Set form to empty only on success
    try {
      await dispatch(addNewQuestion(formData)).unwrap();
      setFormData(initialState);
    } catch (err) {
      AlertNotification.error(err.message).notify(dispatch);
    };
  };

  return (
    <div className="post-form">
      <h1 className="section-title" align="left">
        Add New Questions
      </h1>

      <form onSubmit={onSubmit}>
        <div className="body">
          <div className="column left">
            <input
              className="field"
              type="text"
              name="title"
              placeholder="Title *"
              value={title}
              onChange={onChange}
            />
            <RichText value={description} setValue={onDescriptionChange} />
          </div>

          <div className="column right">
            <MultipleSelect categories={categories} onChange={onChange} />
            <SingleSelect complexity={complexity} onChange={onChange} />
          </div>
        </div>

          <div className="solution"> 
            <h2>Solution Code for Question</h2>
            <LanguageSelector  className="right"/>
            <Editor className="editor " height={400} defaultLanguage="python"
              defaultValue={`#Type your code here`}
              language='python'
              onMount={handleEditorDidMount}
              options={{
                  scrollBeyondLastLine: false,
                  fontSize: "14px",
                  minimap: {
                      enabled: false,
                  }
              }} />
          </div>

          <div className="solution"> 
            <h2>Boilerplate Code for User</h2>
            <LanguageSelector  className="right"/>
            <Editor className="editor " height={300} defaultLanguage="python"
              defaultValue={`#Type your code here`}
              language='python'
              onMount={handleEditorDidMount}
              options={{
                  scrollBeyondLastLine: false,
                  fontSize: "14px",
                  minimap: {
                      enabled: false,
                  }
              }} />
          </div>
            
          <TestCases testCases={testCases} setTestCases={setTestCases}/>

        <div className="btn-container">
          <input type="submit" className="btn" value="Submit"></input>
        </div>
      </form>


      </div>
  );
};

export default QuestionForm;
