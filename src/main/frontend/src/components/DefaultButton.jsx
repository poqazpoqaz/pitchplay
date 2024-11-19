import React from 'react';

const DefaultButton = ({ children }) => {

  const buttonStyle = {
    backgroundColor: '#07550C', 
    color: 'white',            
    border: 'none',                 
    padding: '12px 24px',     
    fontSize: '16px',          
    borderRadius: '8px',        
  };

  // const hoverStyle = {
   //추후 호버효과를 위해 주석처리를 해놨습니다.
  // };

  return (
    <button
      style={buttonStyle}
      // onMouseEnter={(e) => { e.target.style = { ...buttonStyle, ...hoverStyle }; }} 
      // onMouseLeave={(e) => { e.target.style = buttonStyle; }} 
      // 추후 hover효과를 위해   주석처리를해놨습니다
    >
      {children}
    </button>
  );
};

export default DefaultButton;