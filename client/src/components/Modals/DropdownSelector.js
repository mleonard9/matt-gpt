import React, { useState } from 'react';

const DropdownSelector = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('gpt-3.5-turbo');

  const handleSelect = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="model-select-container">
      <label htmlFor="dropdown">Select a Model: </label>
      <select className="model-select" id="dropdown" value={selectedOption} onChange={handleSelect}>
        <option className="model-select-option" value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        {options.map((option, index) => (
          <option className="model-select-option" key={index} value={option.id}>
            {option.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;