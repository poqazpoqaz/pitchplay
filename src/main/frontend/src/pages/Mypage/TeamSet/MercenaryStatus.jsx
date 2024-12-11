import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button';
import axios from 'axios';

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

const MercenaryStatus = ({ mercenaryMembers, onApprove, onReject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedMember, setSelectedMember] = useState(null); // Selected member data
  const [stadiumName, setStadiumName] = useState(''); // 구장 이름 상태

  // 구장 정보 가져오는 함수
  const fetchStadiumName = (stadiumId) => {
    // 예시로, 서버에서 stadiumId로 구장 정보를 받아오는 API 호출 (또는 JSON 파일)
    axios.get(`/api/stadium/${stadiumId}`) // 예: API 호출
      .then((response) => {
        if (response.data) {
          setStadiumName(response.data.PLACENM); // 구장 이름 업데이트
        } else {
          setStadiumName('구장 정보 없음');
        }
      })
      .catch((err) => {
        console.error('구장 정보를 가져오는 데 실패했습니다:', err);
        setStadiumName('구장 정보 없음');
      });
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member); // 클릭한 멤버 저장
    setIsModalOpen(true); // 모달 열기

    // stadiumId로 구장 정보 가져오기
    if (member.stadiumId) {
      fetchStadiumName(member.stadiumId); // stadiumId로 구장 이름 가져오기
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMember(null); // 선택된 멤버 초기화
    setStadiumName(''); // 구장 이름 초기화
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
      <Subtitle>신청한 용병 목록</Subtitle>
      {mercenaryMembers.length === 0 ? (
        <p>대기 중인 용병이 없습니다.</p>
      ) : (
        mercenaryMembers.map((member, index) => (
          <Box key={index} onClick={() => handleMemberClick(member)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Profile image and nickname */}
              <ProfileImg src={member.profileImg || "/default-profile.jpg"} alt={member.mercenarynickname} />
              <h1>{member.mercenarynickname}</h1>
            </div>
            <BoxCal>
              <p>신청일: {member.applicationDate}</p>
            </BoxCal>
          </Box>
        ))
      )}

      {isModalOpen && selectedMember && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <h2>{selectedMember.mercenarynickname}님의 정보</h2>
          <p>신청일: {selectedMember.applicationDate}</p>
          <p>내 소개: {selectedMember.description || '정보 없음'}</p>
          
          {/* 경기 시간, 구장 이름 추가 */}
          <p>구장 이름: {stadiumName || '구장 정보 없음'}</p>
          <p>경기 시간: {selectedMember.collectionTime || '정보 없음'}</p>

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

export default MercenaryStatus;
