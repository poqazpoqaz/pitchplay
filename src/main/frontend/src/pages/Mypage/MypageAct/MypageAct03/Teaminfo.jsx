import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const BottomContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FormList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  &.textarea {
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  width: 120px;
`;

const Value = styled.div`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: ${(props) => (props.textarea ? '40px' : '40px')};
  resize: ${(props) => (props.textarea ? 'none' : 'auto')};
  background-color: #f9f9f9;
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
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #063e09;
  }`;

const Bottom = ({ formFields }) => {
  return (
    <BottomContainer>
      <Title>마이페이지 &gt; 내정보</Title>
      <FormList>
        {formFields.map((field) => (
          <FormItem key={field.name} className={field.name === "teamIntro" ? "textarea" : ""}>
            <Label>{field.label}</Label>
            <Value textarea={field.name === "teamIntro"}>{field.value}</Value>
          </FormItem>
        ))}
      </FormList>
      <BtnEnd>
        <LinkButton to="/mypage/members">
        멤버 보기
        </LinkButton>
      </BtnEnd>
    </BottomContainer>
  );
};

export default Bottom;
