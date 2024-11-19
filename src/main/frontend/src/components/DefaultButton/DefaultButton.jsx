import React from 'react';
import './Defaultbutton.css';

const DefaultButton = ({ children, onClick }) => {
  // 버튼 클릭 시 실행될 onClick 핸들러와
  // 버튼의 텍스트나 내용을 전달하는 children을받습니다.
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default DefaultButton;