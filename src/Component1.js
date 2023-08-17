import React, { useState } from 'react';
import './App.css'; 


function Component1() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const handleWindowClick = () => {
    setIsWindowOpen(!isWindowOpen);
  };

  return (
    <div className="container-window">
      <input
        type="checkbox"
        id="toggleCurtain"
        className="toggle"
        checked={isWindowOpen}
        onChange={() => {}}
      />
      <figure className={`window ${isWindowOpen ? 'open' : ''}`} onClick={handleWindowClick}>
        {/* Tende */}
        <div className="curtain"></div>

        {/* Nuvole */}
        <div className="clouds">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </figure>
    </div>
  );
}

export default Component1;
  
  