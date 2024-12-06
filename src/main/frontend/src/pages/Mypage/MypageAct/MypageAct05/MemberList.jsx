import React, { useState } from 'react';
import styled from 'styled-components';

// 전체 컨테이너 (한 줄에 5개씩)
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 한 줄에 5개의 카드
  gap: 20px;
  padding: 20px;
  width: 100%; // 전체 너비를 사용

  @media (max-width: 1024px) {
  grid-template-columns: repeat(3, 1fr); // 화면 크기가 작아지면 3칸으로 변경
  }

  @media (max-width: 760px) {
  grid-template-columns: repeat(2, 1fr); // 화면 크기가 작아지면 2칸으로 변경
  }
`;

// 팀원 카드 스타일
export const MemberBox = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 12px; // 둥근 모서리
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 부드러운 그림자
  transition: all 0.3s ease-in-out; // 호버 효과
  overflow: hidden; // 내용이 카드 안에서 벗어나지 않도록 함

  &:hover {
    transform: translateY(-5px); // 호버 시 살짝 위로 올라가는 효과
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); // 호버 시 그림자 강조
  }
`;

// 이름과 역할 스타일
export const MemberInfo = styled.div`
  p {
    margin: 8px 0;
    font-size: 16px;
    color: #333;
    font-weight: 500; // 이름과 역할에 볼드 효과
  }
`;

// 옵션 버튼 (세로로 3개의 점)
export const OptionsButton = styled.button`
  position: absolute;
  top: 40px; // 위에서 조금 더 내려옴
  right: 15px; // 오른쪽 상단에 배치
  background: none;
  border: none;
  cursor: pointer;
  
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span {
    width: 6px;
    height: 6px;
    background-color: #333;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  &:hover span {
    background-color: #066DFF; // 호버 시 색상 변경
  }
`;

// 드롭다운 메뉴
export const Dropdown = styled.div`
  position: relative;
  right: 10%;
  bottom: 5%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

// 드롭다운 아이템
export const DropdownItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #333;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid #ddd; 
  border-radius: 5px;
  margin-bottom: 5px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 셀렉트 박스 스타일
export const SelectRole = styled.select`
  cursor: pointer;
  font-size: 14px;
  color: #333;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid #ddd;
   
  &:hover {
  background-color: #f0f0f0;
  }
`;

// 알림 스타일
export const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  z-index: 1000;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  animation: slideIn 0.5s ease-out;
  
  @keyframes slideIn {
    0% {
      transform: translateX(-50%) translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const MemberList = ({ dropdownOpen, members, handleRoleChange, handleDelete, notification, selectedRole, handleDropdownToggle }) => {


  return (
    <>

      <Notification visible={notification !== ''}>{notification}</Notification>
      <Container>
        {members && members.map((member, index) => (
          <MemberBox key={index}>
            <OptionsButton onClick={() => handleDropdownToggle(index)}>
              <span></span>
              <span></span>
              <span></span>
            </OptionsButton>


            {dropdownOpen === index ? (
              // 드롭다운이 열렸을 때
              <Dropdown>
                <DropdownItem onClick={() => handleDelete(index)}>멤버 추방</DropdownItem>
                <SelectRole
                  value={selectedRole || member.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                >
                  <option value="Member">Member</option>
                  <option value="Manager">Manager</option>
                </SelectRole>
              </Dropdown>
            ) : (
              // 드롭다운이 열리지 않았을 때
              <MemberInfo>
                <p>{member.name}</p>
                <p>{member.role}</p>
              </MemberInfo>
            )}
          </MemberBox>
        ))}
      </Container>
    </>
  );
};

export default MemberList;