import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkButton = styled(Link)`
  display: inline-block;
  color: black;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #066DFF;
  }
`;
const LinkButton1 = styled(Link)`
  display: inline-block;
  color: blue;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #066DFF;
  }
`;

const Gapgap = styled.ul`
gap : 15px;
list-style : none;
display : flex;

`

const Linkb = ()=>{

    return (
        <Gapgap>
        <li>
            <LinkButton to="/mypage/teamsection">팀 정보</LinkButton>
        </li>
        <li>
            <LinkButton1 to="/mypage/teamschedule">팀 일정</LinkButton1>
        </li>
    </Gapgap>
    )
}
export default Linkb;