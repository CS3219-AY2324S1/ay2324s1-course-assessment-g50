import "./attemptView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import LanguageSelector from "../collabViewComponents/LanguageSelector";
import { fetchAttemptedQuestionDetails } from "../../../reducers/questionSlice";
import { fetchUserAttemptDetailsAction } from "../../../reducers/userSlice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LANGUAGES = {
    PYTHON: 'python',
    JAVA: 'java',
    JAVASCRIPT: 'javascript',
}

/* Component which shows past attempts */
const AttemptView = ({ questionName }) => {
    const [isEditorMounted, setIsEditorMounted] = useState(false);

    const question = useSelector(state => state.questions.attemptedQuestionDetails);
    const savedCodeArr = useSelector(state => state.currentUser.questionAttemptsArray);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Props info for CodeEditor & InfoBar */
    const [language, setLanguage] = useState(LANGUAGES.PYTHON);

    const editorRef = useRef();
    
    // Sets editor reference when the editor is sucessfully mounted
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        setIsEditorMounted(true);
    }

    // Handle editor code submission
    const getEditorCode = () => {
        return editorRef.current.getValue()
    }

    // Searches through the array of attempts to check if there was an attempt made in that language else it leaves a comment
    const handleLanguageChange = (event) => {
        const newLang = event.target.value
        setLanguage(newLang)
        const attempt = savedCodeArr.find(object => object.codeLanguage === newLang);
        if (attempt !== undefined) {
            editorRef.current.setValue(attempt.savedCode);
        } else {
            if (newLang === LANGUAGES.JAVA || newLang === LANGUAGES.JAVASCRIPT) {
                editorRef.current.setValue("//No code attempt found");
            } else {
                editorRef.current.setValue("#No code attempt found");
            }
        }
    }

    const goBack = () => {
        navigate("/profile", {state: { isAccessedFromHistory: true }});
    }
    
    // Gets the latest submission once the editor has mounted and the code attempts are retrieved
    useEffect(() => {
        if (savedCodeArr.length > 0 && isEditorMounted){
            const attempt = savedCodeArr.find(object => object.codeLanguage === LANGUAGES.PYTHON);
            const userCode = attempt ? attempt.savedCode : "#No code attempt found"
            editorRef.current.setValue(userCode);
        } else if (isEditorMounted) {
            editorRef.current.setValue("#No code attempt found");
        }
    }, [savedCodeArr, isEditorMounted]);

    // retrieves the code based on the given questionName
    useEffect(() => {
        dispatch(fetchUserAttemptDetailsAction({ questionName }));
    }, [])

    // retrieves the attempted question details based on questionName
    useEffect(() => {
        dispatch(fetchAttemptedQuestionDetails({ questionName }));
    }, [])

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