import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BottomContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-row: 2;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;
const SubTitle = styled.h1`
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
  font-size: 1rem;
  font-weight: bold;
  width: 120px;
`;

const ValueDisplay = styled.div`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  height: ${(props) => (props.textarea ? '100px' : 'auto')};
  overflow-y: ${(props) => (props.textarea ? 'auto' : 'visible')};
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

const IniSet = ({ formFields, id }) => {
  return (
    <BottomContainer>
      <Title>마이페이지 &gt; 내정보</Title>
      <FormList>
        <SubTitle>기본 설정</SubTitle>
        {formFields.map((field) => (
          <FormItem key={field.name} className={field.name === "intro" ? "textarea" : ""}>
            <Label>{field.label}</Label>
            <ValueDisplay textarea={field.name === "intro"}>
              {field.value}
            </ValueDisplay>
          </FormItem>
        ))}
      </FormList>
      <BtnEnd>
        <LinkButton to={`/mypage/${id}/changeset`}>수정하기</LinkButton>
      </BtnEnd>
    </BottomContainer>
  );
};

export default IniSet;
