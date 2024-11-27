import React from 'react';
import styled from 'styled-components';

const Top1 = styled.div`
  padding: 20px;
  border: 2px dashed black;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
`;

const Box = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const BoxCal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;

const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color: #07550C;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #063e09;
  }
`;

const MatchesSection = ({ matches = [] }) => {
  return (
    <Top1>
      <Subtitle>예약한 경기 목록</Subtitle>
      {/* 항상 두 개의 Box는 화면에 표시되도록 설정 */}
      <Box>
        <h1>{matches[0]?.location}</h1>
        <BoxCal>
          <p>{matches[0]?.date}</p>
        </BoxCal>
      </Box>
      <Box>
        <h1>{matches[1]?.location}</h1>
        <BoxCal>
          <p>{matches[1]?.date}</p>
        </BoxCal>
      </Box>

      <BtnEnd>
        <LinkButton href="/matches">더 보기</LinkButton>
      </BtnEnd>
    </Top1>
  );
};

export default MatchesSection;
