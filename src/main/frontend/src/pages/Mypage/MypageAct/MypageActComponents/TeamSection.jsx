import React from 'react';
import styled from 'styled-components';
import pachiImage from './pachi.jpg';

const Container = styled.div`
  padding: 20px;
  border: 2px dashed black;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
`;

const Top3Item = styled.div`
  display: flex;
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem;
`;

const TeamDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const TeamImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 50px;
`;

const TeamName = styled.h2`
  margin: 0;
`;

const Members = styled.p`
  margin: 0;
`;

const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color: #07550c;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const TeamSection = ({ teamInfo }) => {
  return (
    <Container>
      <Subtitle>내 팀 정보</Subtitle>
      <Top3Item>
        <TeamInfo>
          <TeamImg
            src={teamInfo?.image || pachiImage}
            alt="팀 이미지"
          />
        </TeamInfo>
        <TeamDetails>
          <TeamName>{teamInfo?.name || "안산 그리너스"}</TeamName>
          <Members>
            {teamInfo?.location || "안산 고잔동"} / {teamInfo?.members || 24}명
          </Members>
        </TeamDetails>
      </Top3Item>
      <BtnEnd>
        <LinkButton href="/team">나의 팀</LinkButton>
      </BtnEnd>
    </Container>
  );
};

export default TeamSection;
