import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
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

const MatcheList = ({ matches = [] }) => {
  const filledMatches = matches.length > 0 
    ? matches.slice(0, 10) 
    : Array.from({ length: 3 }, () => ({ location: ''}));

  return (
    <Container>
      <Title>예약한 경기 목록</Title>
      {filledMatches.map((match, index) => (
  <Box key={index}>
    <h1>{match.location || '위치 정보 없음'}</h1>
    <BoxCal>
      <p>{match.date || '날짜 정보 없음'}</p>
    </BoxCal>
  </Box>
))}
    </Container>
  );
};

export default MatcheList;
