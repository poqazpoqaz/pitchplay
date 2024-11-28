import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Top1 = styled.div`
  padding: 20px;
  border: 2px dashed black;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
`;

const Box = styled.div`
  background-color: #f4f4f4;
  border-radius: 5px;
  height : 60px;
  width : 100%;
  display : flex;
  justify-content : space-between;
  margin : 10px;
  padding : 5px;
`;

const BoxCal = styled.span`
  margin-top : 30px;
  margin-right : 15px;


`;

const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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
        <LinkButton to="/mypage/matches">더 보기</LinkButton>
      </BtnEnd>
    </Top1>
  );
};

export default MatchesSection;
