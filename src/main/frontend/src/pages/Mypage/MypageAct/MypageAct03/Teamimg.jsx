import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;    
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
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

const TeamName = styled.h1`
  margin: 0;
  font-size : 36px;
  color : black;
`;

const Members = styled.p`
  margin: 0;
  font-size : 18x;
  color : #555;
`;
const Teamcode = styled.div`
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ffffff;
  width : auto;
  height : 50px;
  margin-top : 5px;
  
`;
const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;

const Button1 = styled(Link)`
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

const LinkButton = styled(Link)`
  display: inline-block;
  font-weight: bold;
  color: var(--main-color);
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  background: #e9ecef;
  padding: 10px;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--main-color);
  }
`;
const LinkButton1 = styled(Link)`
  display: inline-block;
  color: black;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--main-color);
  }
`;

const Gapgap = styled.ul`
gap : 15px;
list-style : none;
display : flex;

`

const Temp = styled.p`
margin : 12px;
`

const Teamimg = ({ teamInfo }) => {
  return (
    <Container>
      <Gapgap>
        <li>
          <LinkButton to="/mypage/pitch123/teamsection">팀 정보</LinkButton>
        </li>
        <li>
          <LinkButton1 to="/mypage/pitch123/teamschedule">팀 일정</LinkButton1>
        </li>
      </Gapgap>
      <Top3Item>
        <TeamInfo>
          <TeamImg
            src={teamInfo.image}
            alt="팀 이미지"
          />
        </TeamInfo>
        <TeamDetails>
          <TeamName>{teamInfo.name}</TeamName>
          <Members>
            {teamInfo.location} / {teamInfo.teamMembers}
          </Members>
          <Teamcode>
            <Temp>팀 코드 : {teamInfo.teamCode}</Temp>
          </Teamcode>
        </TeamDetails>
      </Top3Item>
      <BtnEnd>
        <Button1>
          탈퇴하기
        </Button1>
      </BtnEnd>
    </Container>
  );
};

export default Teamimg;
