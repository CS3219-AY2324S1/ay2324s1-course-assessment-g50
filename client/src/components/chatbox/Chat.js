import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageAction,
  fetchConversationsAction,
  fetchMessageAction,
  selectAllMessages,
  selectCurrentConversation,
} from "../../reducers/communicationSlice";
import Message from "./chat-components/Message";
import Emoji from "./chat-components/Emoji"
import "./chat.css";

const Chat = ({ currentUser, matchInfo, socket }) => {
  const dispatch = useDispatch();
  const matchedUser = matchInfo.matchedUserInfo.filter(user => user.userId !== currentUser.userId)[0];
  const messages = useSelector(selectAllMessages);
  const currentChat = useSelector(selectCurrentConversation);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  /* Socket connection */
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log(data)
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  /* Try and retrieve current conversation whenever status is changed */
  useEffect(() => {
    dispatch(fetchConversationsAction(matchInfo.matchId));
  }, [])

  /* Handle chat options: */
  // Emoji:
  const [showEmojiList, setShowEmojiList] = useState(false);
  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiList(false);
  };
  // Event listener to close Emoji component when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiList && !event.target.closest(".emoji-option")) {
        setShowEmojiList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojiList]);

  /* Update messages when new message comes */
  useEffect(() => {
    if (currentChat) {
      dispatch(fetchMessageAction(currentChat._id));
    }
  }, [arrivalMessage, currentChat]);

  /* Handle messages submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser.userId.toString(),
      text: newMessage,
      conversationId: currentChat._id,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUser.userId.toString(),
      receiverId: matchedUser.userId.toString(),
      text: newMessage,
    });
    dispatch(addMessageAction(message));
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-box-header">
          <span>Chat with {matchedUser.nickname}</span>
        </div>
        <div className="chat-box-wrapper">
          <div className="chat-box-top">
            {messages.map((m, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={m} own={m.sender === currentUser.userId.toString()} />
              </div>
            ))}
          </div>
          <div className="chat-options">
            <div className="emoji-option">
              <Button onClick={() => setShowEmojiList(!showEmojiList)}>
                <svg t="1699792632335" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1915" width="20" height="20"><path d="M512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512S277.333333 85.333333 512 85.333333s426.666667 192 426.666667 426.666667-192 426.666667-426.666667 426.666667z m0-768c-187.733333 0-341.333333 153.6-341.333333 341.333333s153.6 341.333333 341.333333 341.333333 341.333333-153.6 341.333333-341.333333-153.6-341.333333-341.333333-341.333333z" fill="#A6AAAF" p-id="1916"></path><path d="M682.666667 469.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666666 42.666667-17.066667 42.666667-42.666666 42.666666z m-341.333334 0c-25.6 0-42.666667-17.066667-42.666666-42.666666s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM341.333333 554.666667c0 93.866667 76.8 170.666667 170.666667 170.666666s170.666667-76.8 170.666667-170.666666H341.333333z" fill="#C6CAD0" p-id="1917"></path></svg>
              </Button>
              {showEmojiList && <Emoji handleEmojiClick={handleEmojiClick} />}
            </div>
          </div>
          <div className="chat-box-bottom">
            <textarea
              className="chat-message-input"
              placeholder="Your message to peer..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="chat-submit-button" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;