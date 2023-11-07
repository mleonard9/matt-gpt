import React from 'react';
import ChatTile from './Chat/ChatTile';

function SideMenu ({chats, activeChatId, onSelect, onDelete, onAddChat, onTitleChange}) {
  const handleAddChat = () => {
    onAddChat();
  };

  return (
    <div>
      <div className="side-menu-button" onClick={handleAddChat}>
        <span>+</span>
          Add Chat
        </div>
        <div className="divider" /> 
      {
        chats.map(chat => (
          <ChatTile chat={chat} activeChatId={activeChatId} onSelect={onSelect} onDelete={onDelete} onTitleChange={onTitleChange} key={chat.id}/>
        ))
      }
    </div>
  )
} 

export default SideMenu;