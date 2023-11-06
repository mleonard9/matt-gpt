import React, { useState } from 'react';
import { getJarvisQuote } from '../../utils/Utils';

function UserInput({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={getJarvisQuote()}
        className="chat-input-textarea"
      />
    </div>
  );
}

export default UserInput;