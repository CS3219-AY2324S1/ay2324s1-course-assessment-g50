import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import RichText from "./rich-text.js";
import { MultipleSelect, SingleSelect } from "./multi-select.js";
import { addNewQuestion } from "../../reducers/questionSlice.js";
import AlertNotification from "../../services/alert.service.js";
import TestCases from "./testcase-field.js";
import CodeBox from "./code-box.js";
import "./question-form.css";
import LanguageSelector from "../userCollaboration/collabViewComponents/LanguageSelector.js";

// Empty Form (question has additional id field set after calling addQuestion)
const initialState = {
  title: "",
  categories: [],
  description: "~Question Description~",
  complexity: "",
};

const EMPTY_DESCRIPTION = "<p><br></p>";

const QuestionForm = () => {
  const dispatch = useDispatch();

  // Main form
  const [formData, setFormData] = useState(initialState);
  const { title, categories, description, complexity } = formData;

  const onDescriptionChange = (value) => {
    // If not form data's initial state
    if (value !== EMPTY_DESCRIPTION) {
      return setFormData({ ...formData, description: value });
    }
  };

  // Update the state with the selected values
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  // solution code
  const [solutionCode, setSolutionCode] = useState('');

  // template code
  const [templateLang, setTemplateLang] = useState('python');
  const [templateCode, setTemplateCode] = useState({
    javascript: '',
    python: '',
    java: ''
  })
  const [currCode, setCurrCode] = useState('');

  const handleLanguageChange = (event) => {
    setTemplateLang(event.target.value)
    console.log('old lang' + currCode)

    setTemplateCode(prev => {
      return {...prev, [templateLang]: currCode}
    })

    console.log('changed to' +templateCode[event.target.value])
    setCurrCode(templateCode[event.target.value]);
  }

  // testcases
  const [testCases, setTestCases] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(solutionCode)
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
          <label>Javascript</label>
          <CodeBox code={solutionCode} setCode={setSolutionCode}/>
        </div>

        <div className="solution"> 
          <h2>Template Code for User</h2>
          <LanguageSelector selectedLanguage={templateLang} handleLanguageChange={handleLanguageChange} className="right"/>
          <CodeBox code={currCode} setCode={setCurrCode} language={templateLang}/>
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
