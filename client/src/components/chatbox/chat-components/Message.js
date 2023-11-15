import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import "./message.css";

const Message = ({ message, own }) => {
  const [user, setUser] = useState(null);
  const userInfos = useSelector(state => state.matching.matchedUserInfo)

  useEffect(() => {
    const targetUserId = message.sender
    const targetUserInfo = userInfos.find((info) => info.userId.toString() === targetUserId);

    setUser(targetUserInfo);
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <>
            <p className="messageText">{message.text}</p>
            <img className="messageImg" src={user?.avatar} alt="" />
          </>
        ) : (
          <>
            <img className="messageImg" src={user?.avatar} alt="" />
            <p className="messageText">{message.text}</p>
          </>
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;