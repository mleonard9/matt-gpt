import React, { useState, useEffect } from 'react';
import DropdownSelector from './DropdownSelector';

const ProfileModal = ({ onClose, onSubmit, onDelete, show, initialProfile, models }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    setTitle(initialProfile?.title);
    setPrompt(initialProfile?.prompt);
    setModel(initialProfile?.model);
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'title' ? setTitle(value) : setPrompt(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      prompt,
      model,
      id: initialProfile?.id
    });
  };

  const handleDelete = () => {
    onDelete(initialProfile?.id);
  };

  const handleModelSelect = (option) => {
    setModel(option);
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit} className="modal-form-container">
          <DropdownSelector options={models} onSelect={handleModelSelect} />
          <div className="modal-input-container">
            <input
              className="modal-input"
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder='Title'
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-input-container">
            <textarea
              className="modal-input textarea"
              id="prompt"
              name="prompt"
              value={prompt}
              placeholder='You are a ...'
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="modal-button">Submit</button>
            <button type="button" className="modal-button" onClick={onClose}>
              Close
            </button>
            <button type="button" className="modal-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileModal;