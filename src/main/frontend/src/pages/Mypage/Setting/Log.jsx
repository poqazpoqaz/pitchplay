import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// 제목 스타일
const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Log = () => {
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // 로그아웃 확인 처리
  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  // 회원 탈퇴 확인 처리
  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  // 회원 탈퇴 처리
  const handleDeleteAccount = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div>
      <Title>계정</Title>
        <ul>
          <li>
          <ButtonDe onClick={handleLogoutConfirmation}>로그아웃</ButtonDe>
          </li>
          <li>
          <ButtonDe onClick={handleDeleteConfirmation}>회원 탈퇴</ButtonDe>
          </li>
          </ul>
      {/* 로그아웃 확인 모달 */}
      {showLogoutConfirmation && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>로그아웃하시겠습니까?</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={handleLogout}>네</ModalButton>
              <ModalButton onClick={() => setShowLogoutConfirmation(false)}>아니요</ModalButton>
            </ModalButtons>
          </Modal>
        </ModalOverlay>
      )}

      {/* 회원 탈퇴 확인 모달 */}
      {showDeleteConfirmation && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>회원 탈퇴를 진행하시겠습니까?</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={handleDeleteAccount}>네</ModalButton>
              <ModalButton onClick={() => setShowDeleteConfirmation(false)}>아니요</ModalButton>
            </ModalButtons>
          </Modal>
        </ModalOverlay>
      )}
    </div>
  );
};


const ButtonDe = styled.button`
font-size : 18px;

&:hover {
    color : red;
}

`


// 모달 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);  /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  /* 모달이 화면 상단에 나오도록 */
`;

// 모달 본문
const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 모달 제목
const ModalTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

// 모달 버튼 컨테이너
const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap : 20px;
  `;

// 모달 버튼
const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
`;

export default Log;
