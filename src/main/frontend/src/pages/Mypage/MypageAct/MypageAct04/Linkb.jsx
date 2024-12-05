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
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--main-color);
  }
`;
const LinkButton1 = styled(Link)`
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

const Gapgap = styled.ul`
gap : 15px;
list-style : none;
display : flex;

`

const Linkb = ({id})=>{

    return (
        <Gapgap>
        <li>
            <LinkButton to={`/mypage/${id}/teamsection`}>팀 정보</LinkButton>
        </li>
        <li>
        <LinkButton1 to={`/mypage/${id}/teamschedule`}>팀 일정</LinkButton1>
        </li>
    </Gapgap>
    )
}
export default Linkb;