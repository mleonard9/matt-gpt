import React from 'react';
import '../../App.css';
import ChatMessage from './ChatMessage';

function Chat({ chat }) {
  return (
    <div className="chat-log">
      {chat.messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
)};

export default Chat;