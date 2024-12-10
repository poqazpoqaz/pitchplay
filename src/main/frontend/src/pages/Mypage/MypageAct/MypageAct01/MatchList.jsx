import React, { useState } from 'react';
import styled from 'styled-components';
import CancelModal from './CancelModal';
import { formattedDate } from "../../../../utils/formattedDate";

const Container = styled.div`
  padding: 30px;
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin-bottom: 25px;
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

  &:hover {
    transform: translateY(-5px);
  }

  h1 {
    font-size: 18px;
    color: #555;
    margin: 0;
  }
`;

const BoxCal = styled.span`
  margin-right: 15px;
`;

const CancelButton = styled.button`
  background-color: #07550C;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;


`;




const MatcheList = ({ matches, onCancelMatch }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = (match) => {
    if (!onCancelMatch) {
      console.warn("onCancelMatch 함수가 정의되지 않았습니다.");
      return;
    }
    setSelectedMatch(match);
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMatch(null);
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 비교

  // 과거 기록만 필터링
  const pastRecords = matches.filter((match) => {
    const recordDate = new Date(match.matchingDate);
    // record.date가 유효한지 확인
    if (isNaN(recordDate)) {
      console.warn(`Invalid date: ${matches.matchingDate}`);  // 잘못된 날짜 로그 확인
      return false;  // 유효하지 않은 날짜는 필터링
    }
    
    return recordDate >= today; // 오늘 이전 날짜만
  });
  const filledMatches = pastRecords.slice(0, 10);

  return (
    <Container>
      <Title>예약한 경기 목록</Title>
      {filledMatches.length > 0 ? (
        filledMatches.map((match, index) => (
          <Box key={index}>
            <div>
              <h1>{match.location || '위치 정보 없음'}</h1>
              <BoxCal>
                <p>{formattedDate(match.matchingDate) || '날짜 정보 없음'}</p>
              </BoxCal>
            </div>
            <CancelButton onClick={() => handleCancelClick(match)}>예약 취소</CancelButton>
          </Box>
        ))
      ) : (
        <p>예약한 경기가 없습니다.</p>
      )}

      <CancelModal
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCancelMatch={onCancelMatch}
      />
    </Container>
  );
};

export default MatcheList;
