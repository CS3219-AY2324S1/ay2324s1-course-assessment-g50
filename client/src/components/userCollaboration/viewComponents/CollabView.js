import "./collabView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import InfoBar from "../collabViewComponents/InfoBar";
import { retrieveQuestionDetailsAction } from "../../../reducers/matchingSlice";
import { fetchQuestions } from "../../../reducers/questionSlice";
import { useEffect, useState, useRef } from "react";
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco'
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as Y from 'yjs';

const serverWsUrl = "ws://localhost:8200";

/* Component which shows the collaboration view */
const CollabView = () => {
    const questionArr = useSelector(state => state.questions.questions);
    const question = useSelector(state => state.matching.matchedQuestionDetails);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Props info for CodeEditor & InfoBar */
    const [language, setLanguage] = useState("python");
    const matchInfo = useSelector(state => state.matching);

    const doc = new Y.Doc();
    const editorRef = useRef();

    // Handle editor code change
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Code Collaboration part:
        const manacoText = doc.getText("manaco")
        const provider = new WebsocketProvider(serverWsUrl, "matchId", doc);
        const binding = new MonacoBinding(manacoText, editorRef.current.getModel(), new Set([editorRef.current]))
    }

    // Handle editor code submission
    const getEditorCode = () => {
        return editorRef.current.getValue()
    }

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value

        // Language Synchronize part:
        const languageText = doc.getText("language")
        const provider = new WebsocketProvider(serverWsUrl, "matchId", doc);
        languageText.delete(0, languageText.length);
        languageText.insert(0, newLanguage);

        // Handle language change
        const updatedLanguageText = doc.getText("language")
        updatedLanguageText.observe(event => {
            setLanguage(languageText.toString());
        });
    }
    /* ********************************************* */

    const goBack = () => {
        navigate('/');
    }

    /* Replace this logic by passing down the question title to retrieve by */
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [])

    useEffect(() => {
        if (questionArr.length > 0) {
            console.log(questionArr[0].title);
            dispatch(retrieveQuestionDetailsAction({ questionTitle:questionArr[0].title }));
        }
    }, [questionArr])

    return (
        <div className="collab-view">
            <div className="question-details">
            {question && 
            <>
                <p className="question-title">{question.title}</p>
                <p className="question-complexity">{question.complexity}</p>
                <div  dangerouslySetInnerHTML={{ __html: question.description }} />
                
            </>}
            <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
            <p class="hover-text">End Session</p>
            </div>

            <CodeEditor handleEditorDidMount={handleEditorDidMount} language={language} getEditorCode={getEditorCode}/>

            <InfoBar matchInfo={matchInfo} selectedLanguage={language} handleLanguageChange={handleLanguageChange}/>
        </div>
    )
}

export default CollabView;