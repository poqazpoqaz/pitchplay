import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  width: 100px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.isOn ? '#4caf50' : '#f0f0f0')};
  border-radius: 25px;
  cursor: pointer;
  padding: 0 10px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
`;

const ToggleButtonStyled = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOn ? 'translateX(100%)' : 'translateX(-100%)')};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: white;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.3s ease;
`;

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer isOn={isOn} onClick={toggleButton}>
      <TextContainer>
        <ToggleText visible={isOn}>ON</ToggleText>
      </TextContainer>
      <ToggleButtonStyled isOn={isOn} />
      <TextContainer>
        <ToggleText visible={!isOn}>OFF</ToggleText>
      </TextContainer>
    </ToggleContainer>
  );
};

export default ToggleButton;
