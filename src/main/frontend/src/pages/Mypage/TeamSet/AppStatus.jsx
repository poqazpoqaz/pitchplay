import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button';

const Top1 = styled.div`
  padding: 30px;
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px); 
  }
`;

const BoxCal = styled.div`
  font-size: 14px;
  color: #888;
  margin-right: 15px;

  p {
    margin: 0;
    font-weight: bold;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const AppStatus = ({ pendingMembers, onApprove, onReject, teamActions, userState, teamState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member); // 클릭한 멤버 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMember(null); // 선택된 멤버 초기화
  };

  const handleApprove = () => {
    if (selectedMember) {
      // 승인 처리 로직
      onApprove(selectedMember); // 부모 컴포넌트의 onApprove 호출
      closeModal();
    }
  };

  const handleReject = () => {
    if (selectedMember) {
      // 거절 처리 로직
      onReject(selectedMember); // 부모 컴포넌트의 onReject 호출
      closeModal();
    }
  };

  return (
    <Top1>
      <Subtitle>신청한 멤버 목록</Subtitle>

      {pendingMembers.length === 0 ? (
        <p>대기 중인 멤버가 없습니다.</p>
      ) : (
        pendingMembers.map((member, index) => (
          <Box key={index} onClick={() => handleMemberClick(member)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileImg src={member.profileImg} />
              <h1>{member.pendingnickname}</h1>
            </div>
            <BoxCal>
              <p>신청일: {member.applicationDate}</p>
            </BoxCal>
          </Box>
        ))
      )}

      {isModalOpen && selectedMember && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <h2>{selectedMember.pendingnickname}님의 정보</h2>
          <p>신청일: {selectedMember.applicationDate}</p>
          <p>내 소개: {selectedMember.description || '정보 없음'}</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button color="green" size="large" onClick={handleApprove}>
              가입 승인
            </Button>
            <Button color="red" size="large" onClick={handleReject}>
              가입 거절
            </Button>
          </div>
        </Modal>
      )}
    </Top1>
  );
};

export default AppStatus;
