import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
const LinkButton1 = styled(Link)`
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

const Gapgap = styled.ul`
list-style : none;
display : flex;
justify-content: space-between;
margin-top : auto;
`

const MoveButton = ()=>{

    return (
        
        <Gapgap>
        <li>
            <LinkButton to="/mypage/pitch123/dreamers3/members/appmange">신청 관리</LinkButton>
        </li>
        <li>
            <LinkButton1 to="/mypage/pitch123/teamschedule">팀 해체</LinkButton1>
        </li>
    </Gapgap>
    )
}
export default MoveButton;