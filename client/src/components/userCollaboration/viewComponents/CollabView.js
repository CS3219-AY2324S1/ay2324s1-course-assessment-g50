import "./collabView.css";
import CodeEditor from "../collabViewComponents/CodeEditor";
import InfoBar from "../collabViewComponents/InfoBar";
import { useEffect, useState, useRef } from "react";
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco'
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as Y from 'yjs';
import { Button } from '@mui/material';
import { io } from "socket.io-client";
import Chat from "../../chatbox/Chat";
import { fetchUserDataAction } from "../../../reducers/userSlice";
import { serverWsUrl, communicationSocketUrl } from "../../../urls";

/* Component which shows the collaboration view */
const CollabView = ({ question }) => {
    const currentUser = useSelector(state => state.currentUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Props info for CodeEditor & InfoBar */
    const [language, setLanguage] = useState("python");
    const [isEditorMounted, setIsEditorMounted] = useState(false);
    const matchInfo = useSelector(state => state.matching);

    const doc = new Y.Doc();
    const editorRef = useRef();
    const socket = useRef();


    /* Add current User to the chat */
    useEffect(() => {
        socket.current = io(communicationSocketUrl);
        dispatch(fetchUserDataAction());
    }, [])
    useEffect(() => {
        socket.current.emit("addUser", currentUser?.userId?.toString());
    }, [currentUser]);

    // Handle language change
    useEffect(() => {
        if (isEditorMounted) {
            console.log(question)
            editorRef.current.setValue(question.templateCode[language]); 
        }
    }, [language]);

    // Initialise with template code 
    useEffect(() => {
        setTimeout(() => {
            if (isEditorMounted && getEditorCode() === "") {
                editorRef.current.setValue(question.templateCode[language]); 
            }
        }, Math.random() * 2000)

    }, [isEditorMounted]);

    // Handle editor code change
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editorRef.current.setValue(""); //reseting the editor to remove any previous code

        // Code Collaboration part:
        const manacoText = doc.getText("manaco")
        manacoText.delete(0, manacoText.length);

        const provider = new WebsocketProvider(serverWsUrl, matchInfo.matchId, doc);
        const binding = new MonacoBinding(manacoText, editorRef.current.getModel(), new Set([editorRef.current]))
        setIsEditorMounted(true); //set editor is mounted 
    }

    // Handle editor code submission
    const getEditorCode = () => {
        return editorRef.current.getValue()
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
        const provider = new WebsocketProvider(serverWsUrl, matchInfo.matchId, doc);
        
        languageText.delete(0, languageText.length);
        languageText.insert(0, newLanguage);
    }

        // Handle language change
        useEffect(() => {
            const questionText = doc.getText("question")
            questionText.observe(event => {
                setLanguage(questionText.toString());
            });
        }, [])
    
        const handleQuestionChange = (event) => {
            const newQuestion = event.target.value
            // Language Synchronize part:
            const questionText = doc.getText("language")
            const provider = new WebsocketProvider(serverWsUrl, matchInfo.matchId, doc);
            
            questionText.delete(0, questionText.length);
            questionText.insert(0, newQuestion);
        }

    const goBack = () => {
        navigate(-1);
    }

    /* Chat button to toggle chatbox. */
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatBoxRef = useRef(null);
    const openChat = () => {
        setIsChatOpen(true);
    };
    const closeChat = () => {
        setIsChatOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
                closeChat();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [chatBoxRef]);
  
    return (
        <div className="collab-view">
            <div className="question-details">
            {question && 
            <>
                <p className="question-title">{question.title}</p>
                <p className="question-complexity">{question.complexity}</p>
                <div  dangerouslySetInnerHTML={{ __html: question.description }} />
                <p className="testCase">
                    {"Test case input warning:\nTestcases CANNOT have empty spaces at start of line"}
                </p>
                {question.testCases && question.testCases.map((testCase, i) => 
                    <p className="testCase">{`Sample Test case ${i}:\n ${testCase}`}</p>
                )}
            </>}
            <BsArrowLeftSquareFill onClick={() => goBack()} className="return-icon"/>
            <p className="hover-text">End Session</p>
            </div>              

            <CodeEditor handleEditorDidMount={handleEditorDidMount} language={language}
                getEditorCode={getEditorCode} isReadMode={false}/>

            <InfoBar matchInfo={matchInfo} selectedLanguage={language} handleLanguageChange={handleLanguageChange} />
            <div className="chat-button">
                <Button onClick={openChat}>
                    <svg t="1699374304009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4201" width="100%" height="100%"><path d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m-157.696 341.333333a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m159.018667 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m158.997333 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z" fill="#ffffff" p-id="4202"></path></svg>
                </Button>
            </div>
            {isChatOpen && (
                <div ref={chatBoxRef} className="chat-box">
                    <Chat currentUser={currentUser} matchInfo={matchInfo} socket={socket} />
                </div>
            )}
        </div>
    )
}

export default CollabView;