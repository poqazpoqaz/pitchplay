import React from 'react';
import styled from 'styled-components';
import pachiImage from './pachi.jpg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 25px;
  border: none;
  background-color: #f9fafc;
  border-radius : 25px;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
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

const TeamSection = ({ teamInfo, id }) => {
  return (
    <Container>
      <Subtitle>내 팀 정보</Subtitle>
      <Top3Item>
        <TeamInfo>
          <TeamImg
            src={teamInfo.teamImg || ""}
            alt=""
          />
        </TeamInfo>
        <TeamDetails>
          <TeamName>{teamInfo.teamName || ""}</TeamName>
          <Members>
            {teamInfo.teamLoc || ""} / {teamInfo.currentMember || ""}명
          </Members>
        </TeamDetails>
      </Top3Item>
      <BtnEnd>
        <LinkButton to={`/mypage/${id}/teamsection`}>나의 팀</LinkButton>
      </BtnEnd>
    </Container>
  );
};

export default TeamSection;
