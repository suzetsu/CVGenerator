import React, { useState } from "react";

const CustomDropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setSearchText(option); 
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
    setSelectedOption(""); 
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="custom-dropdown">
      <input
        type="text"
        placeholder="Search or enter text"
        onFocus={toggleOptions}
        
        onChange={handleInputChange}
        value={searchText}
      />
      {showOptions && (
        <ul className="dropdown-options">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
