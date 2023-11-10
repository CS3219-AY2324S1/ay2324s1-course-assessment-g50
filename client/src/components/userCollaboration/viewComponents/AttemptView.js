import "./attemptView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import LanguageSelector from "../collabViewComponents/LanguageSelector";
import { retrieveQuestionDetailsAction } from "../../../reducers/matchingSlice";
import { fetchQuestions } from "../../../reducers/questionSlice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";;

/* Component which shows past attempts */
const AttemptView = ({ savedCode }) => {
    const questionArr = useSelector(state => state.questions.questions);
    const question = useSelector(state => state.matching.matchedQuestionDetails);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Props info for CodeEditor & InfoBar */
    const [language, setLanguage] = useState("python");

    const editorRef = useRef();

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editorRef.current.setValue(savedCode);
    }

    // Handle editor code submission
    const getEditorCode = () => {
        return editorRef.current.getValue()
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }
    /* ********************************************* */

    const goBack = () => {
        navigate("/profile", {state: {isAccessedFromHistory: true}});
    }

    /* Replace this logic by passing down the allocated question title
    for both users to retrieve the question details */
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [])

    useEffect(() => {
        if (questionArr.length > 0) {
            dispatch(retrieveQuestionDetailsAction({ questionTitle:questionArr[0].title }));
        }
    }, [questionArr])

    return (
        <div className="attemptView">
            <div className="question-details">
            {question && 
            <>
                <p className="question-title">{question.title}</p>
                <p className="question-complexity">{question.complexity}</p>
                <div  dangerouslySetInnerHTML={{ __html: question.description }} />
                
            </>}
            <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
            <p className="hover-text">Back</p>
            </div>

            <CodeEditor handleEditorDidMount={handleEditorDidMount} language={language} getEditorCode={getEditorCode} isReadMode={true}/>

            <div className="info-bar-container">
                <div className="language-selector">
                    <LanguageSelector selectedLanguage={language} handleLanguageChange={handleLanguageChange} />
                </div>
            </div>
        </div>
    )
}

export default AttemptView;