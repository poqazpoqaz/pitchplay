import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: inline-block;
  background: ${(props) => (props.$isActive ? 'var(--main-color)' : '#ffffff')};
  border-radius: 10px;
  border: 2px solid #7A7B7A;
  text-decoration: none; /* 기본적으로 링크의 밑줄 제거 */

  &:hover {
    background: var(--main-color);
    color: #ffffff;
    box-shadow: 1px 2px 2px #898989;
    border: none;
  }
`;

const StyledButton = styled(motion.button)`
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
  color: ${(props) => (props.$isActive ? '#ffffff' : 'var(--main-color)')}; 
  font-weight: bold;
  width: 100%;
  height: 100%;
  
  &:hover{
    color: #ffffff;
  }
`;

function DefaultButton({ children, gridArea, size, isActive, onClick, src }) {

  return (
    <StyledLink to={src} style={{ gridArea: gridArea }} $isActive={isActive}>
      <StyledButton
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        size={size}
        $isActive={isActive}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </StyledLink>
  );
};

export default DefaultButton;