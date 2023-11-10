import "./attemptView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import LanguageSelector from "../collabViewComponents/LanguageSelector";
import { retrieveQuestionDetailsAction } from "../../../reducers/matchingSlice";
import { fetchQuestions } from "../../../reducers/questionSlice";
import { fetchUserAttemptDetailsAction } from "../../../reducers/userSlice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";;

/* Component which shows past attempts */
const AttemptView = ({ questionName }) => {
    const [isEditorMounted, setIsEditorMounted] = useState(false);

    const questionArr = useSelector(state => state.questions.questions);
    const question = useSelector(state => state.matching.matchedQuestionDetails);
    const savedCodeArr = useSelector(state => state.currentUser.attemptedQuestionDetails);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Props info for CodeEditor & InfoBar */
    const [language, setLanguage] = useState("python");

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
            editorRef.current.setValue("//code not found");
        }
    }

    const goBack = () => {
        navigate("/profile", {state: {isAccessedFromHistory: true}});
    }
    
    // Gets the latest submission once the editor has mounted and the code attempts are retrieved
    useEffect(() => {
        if (savedCodeArr.length > 0 && isEditorMounted){
            editorRef.current.setValue(savedCodeArr[0].savedCode);
            setLanguage(savedCodeArr[0].codeLanguage);
        }
    }, [savedCodeArr, isEditorMounted]);

    //retrieves the code based on the given questionName
    useEffect(() => {
        dispatch(fetchUserAttemptDetailsAction({ questionName }));
    }, [])

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