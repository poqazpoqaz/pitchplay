import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      {/* 공지와 버튼만 있는 영역 */}
      <div className="header">
        <span>임의의 공지입니다</span>
        <button className="chevron-button" onClick={toggleContent}>
          {/* SVG 코드를 직접집어넣었습니다. */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12L16 20L24 12" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>
      </div>

      {/* 내용을 펼치는효과 */}
      <div className={`content-box ${isOpen ? 'open' : ''}`}>
        <div className="content">
          <p>임의의 내용입니다</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;