import React from 'react';
import './emoji.css';

// Emoji management
const Emoji = ({ handleEmojiClick }) => {
  const emojis = [
    "😊", "😃", "😏", "😍", "😘", "😚", "😳", "😌", "😆", "😁", "😉", "😜", "😝",
    "😀", "😗", "😙", "😛", "😴", "😟", "😦", "😧", "😮", "😬", "😕", "😯", "😑",
    "😒", "😅", "😓", "😥", "😩", "😔", "😞", "😖", "😨", "😰", "😣", "😢", "😭",
    "😂", "😲", "😱", "😫", "😠", "😤", "😪", "😋", "😷", "😎", "😵", "👿", "😈",
    "😐", "😶", "👍", "👍", "👎", "👎", "👌", "👊", "👊", "✊", "✌", "👋", "✋", "✋",
    "👐", "☝", "👇", "👈", "👉", "🙌", "🙏", "👆", "👏", "💪", "🤘"
  ];

  return (
    <div className="chat-emoji-list">
      {emojis.map((value, index) => (
        <li
          key={index}
          onClick={() => handleEmojiClick(value)}
          className="chat-emoji-list-item"
        >
          {value}
        </li>
      ))}
    </div>
  );
};

export default Emoji;