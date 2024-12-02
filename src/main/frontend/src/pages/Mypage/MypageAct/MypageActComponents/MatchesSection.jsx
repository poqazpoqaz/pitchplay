import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const LinkButton = styled(Link)`
  display: inline-block;
  background-color: #07550C;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #063e09;
    transform: scale(1.05); /* 버튼 확대 효과 */
  }
`;

const MatchesSection = ({ matches }) => {
  return (
    <Top1>
      <Subtitle>예약한 경기 목록</Subtitle>
      {matches.map((match, index) => (
        <Box key={index}>
          <h1>{match?.location || '위치 정보 없음'}</h1>
          <BoxCal>
            <p>{match?.matchingDate || '날짜 정보 없음'}</p>
          </BoxCal>
        </Box>
      ))}
      <BtnEnd>
        <LinkButton to="/mypage/pitch123/matches">더 보기</LinkButton>
      </BtnEnd>
    </Top1>
  );
};

export default MatchesSection;
