import React from 'react';
import styled from 'styled-components';
import { formattedDate } from "../../../../utils/formattedDate"

const Container = styled.div`
  padding: 30px;
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 카드형 그림자 */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* 호버 시 살짝 떠오르는 효과 */
  }

  h1 {
    font-size: 18px;
    color: #555;
    margin: 0;
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

const RecordList = ({ records = [] }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 비교

  // 과거 기록만 필터링
  const pastRecords = records.filter((record) => {
    const recordDate = new Date(record.matchingDate);
    // record.date가 유효한지 확인
    if (isNaN(recordDate)) {
      console.warn(`Invalid date: ${record.matchingDate}`);  // 잘못된 날짜 로그 확인
      return false;  // 유효하지 않은 날짜는 필터링
    }
    
    return recordDate < today; // 오늘 이전 날짜만
  });

  // 최대 10개의 과거 기록 가져오기
  const filledMatches = pastRecords.slice(0, 10);

  return (
    <Container>
      <Title>참가한 기록 목록</Title>
      {filledMatches.length > 0 ? (
        filledMatches.map((record, index) => (
          <Box key={index}>
            <h1>{record.location || '위치 정보 없음'}</h1>
            <BoxCal>
              <p>{formattedDate(record.matchingDate) || '날짜 정보 없음'}</p>
            </BoxCal>
          </Box>
        ))
      ) : (
        <Box>
          <h1>참가한 기록이 없습니다.</h1>
        </Box>
      )}
    </Container>
  );
};

export default RecordList;

