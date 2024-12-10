import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatCurrency } from "../../../utils/formattedDate";

const Top22 = styled.div`
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 2;
  grid-row: 1;
  ul {
    display: block;
    list-style: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin-right: 10px;
    margin-top: 18.5px;
  }
`;

const LinkButton = styled(Link)`
  background-color: #07550C;
  color: white;
  border: none;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  &:hover {
    background-color: #06420A;
  }
`;

const Top2 = ({ username, usercash, id }) => {
  return (
    <Top22>
      <h2>{username} 님</h2>
      <p>잔액: {formatCurrency(usercash)} 캐시</p>
      <ul>
        <li>
        <LinkButton to='/charge'>충전하기</LinkButton>
        </li>
        <li>
          <LinkButton to="/refund">환불하기</LinkButton>
        </li>
        <li>
          <LinkButton to={`/mypage/${id}/history`}>사용 내역</LinkButton>
        </li>
      </ul>
    </Top22>
  );
};

export default Top2;
