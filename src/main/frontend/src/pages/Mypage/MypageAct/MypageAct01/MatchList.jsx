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

const BoxCal = styled.span`
  margin-top : 30px;
  margin-right : 15px;


`;

const MatcheList = ({ matches }) => {
  // 오늘 날짜 가져오기
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 예약된 경기들 필터링 (오늘 이후 경기만)
  const upcomingMatches = matches.filter((match) => {
    const matchDate = new Date(match.matchingDate);
    return matchDate >= today;
  });

  // 10개 항목만 가져오고, 없으면 빈 데이터로 채움
  const filledMatches = upcomingMatches.length > 0
    ? upcomingMatches.slice(0, 10)
    : Array.from({ length: 3 }, () => ({ location: '', matchingDate: '' }));

  return (
    <Container>
      <Title>예약한 경기 목록</Title>
      {filledMatches.map((match, index) => (
        <Box key={index}>
          <h1>{match.location || '위치 정보 없음'}</h1>
          <BoxCal>
            <p>{formattedDate(match.matchingDate) || '날짜 정보 없음'}</p>
          </BoxCal>
        </Box>
      ))}
    </Container>
  );
};

export default MatcheList;
