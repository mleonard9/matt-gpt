import { IconTrash } from '@tabler/icons-react';
import React from 'react';

function ChatTile ({chat, activeChatId, onSelect, onDelete, onTitleChange}) {
  const handleDelete = () => {
    onDelete(chat.id);
  };

  const handleChatSelect = () => {
    onSelect(chat.id);
  };

  const handleTitleChange = (event) => {
    onTitleChange(chat.id, event.target.value);
  }; 

  return (
    <div className={chat.id === activeChatId ? "side-menu-chat-active" : "side-menu-chat"} key={chat.id} onClick={handleChatSelect}>
      <div className="side-menu-chat-title">
        <input className="transparent-input" type="text" value={chat.title} onChange={handleTitleChange}/>
      </div>
      <div className="action-buttons">
        <div className="delete-button" onClick={handleDelete}>
          <IconTrash size={12} />
        </div>
      </div>
    </div>
  )
} 

export default ChatTile;