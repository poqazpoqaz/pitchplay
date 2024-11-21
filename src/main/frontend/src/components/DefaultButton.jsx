import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DefaultButton = ({ children, gridArea, size }) => {
  const StyledButton = styled(motion.button)`
  background: #ffffff;  
  color: var(--main-color); 
  font-weight: bold;
  border-radius: 10px;
  border: 2px solid #7A7B7A;
  font-size: ${(props) => {
      switch (props.size) {
        case 'small':
          return '10px';
        case 'medium':
          return '18px';
        case 'large':
          return '20px';
        case 'xlarge':
          return '30px';
        default:
          return '15px';  // 기본값 설정
      }
    }};
  font-weight: bold;

  &:hover{
      background: var(--main-color);
      color: #ffffff;
      box-shadow: 1px 2px 2px #898989;
      border: none;
  }
`;

  return (
    <StyledButton
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      style={{ gridArea: gridArea }}
      size={size}
    >
      {children}
    </StyledButton>
  );
};

export default DefaultButton;