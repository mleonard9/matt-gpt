import React from 'react';
import '../../App.css';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';

function renderChatLog(chat) {
  return (
    <div className="chat-log">
      {chat && chat.messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}


function Chat({ chat, onSubmit, jarvisQuote }) {
  function handleSubmit(message) {
    onSubmit(message);
  }

  return (
    <div className='chat-box'>
       {renderChatLog(chat)}
      <div className="chat-input-holder">
        <UserInput onSubmit={handleSubmit} jarvisQuote={jarvisQuote}/>
      </div>
    </div>  
  )
};

export default Chat;