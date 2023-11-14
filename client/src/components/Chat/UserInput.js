import React, { useState } from 'react';

function UserInput({ onSubmit, jarvisQuote }) {
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
    <input
      type="text"
      value={message}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={jarvisQuote}
      className="chat-input-textarea"
    />
  );
}

export default UserInput;