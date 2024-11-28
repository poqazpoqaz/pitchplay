import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
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

const RecordsSection = ({ records = [] }) => {
  return (
    <Container>
      <Subtitle>참가한 경기 기록</Subtitle>
      {/* 항상 두 개의 Box는 화면에 표시되도록 설정 */}
      <Box>
        <h1>{records[0]?.location}</h1>
        <BoxCal>
          <p>{records[0]?.date}</p>
        </BoxCal>
      </Box>
      <Box>
        <h1>{records[1]?.location}</h1>
        <BoxCal>
          <p>{records[1]?.date}</p>
        </BoxCal>
      </Box>

      <BtnEnd>
        <LinkButton to="/mypage/records">더 보기</LinkButton>
      </BtnEnd>
    </Container>
  );
};

export default RecordsSection;
