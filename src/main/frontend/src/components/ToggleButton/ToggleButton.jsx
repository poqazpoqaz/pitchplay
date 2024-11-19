import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={`toggle-container ${isOn ? 'on' : 'off'}`} onClick={toggleButton}>
      <div className="text-container">
        <span className={`toggle-text ${isOn ? 'visible' : ''}`}>ON</span>
      </div>
      <div className="toggle-button" />
      <div className="text-container">
        <span className={`toggle-text ${!isOn ? 'visible' : ''}`}>OFF</span>
      </div>
    </div>
  );
};

export default ToggleButton;
