import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const BottomContainer = styled.div`
margin-top : 30px;  
padding: 1rem;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 10px;
  background-color: #f9fafc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
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
  color : black;
`;

const Value = styled.div`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  height: ${(props) => (props.textarea == "true" ? '40px' : '40px')};
  resize: ${(props) => (props.textarea == "true"  ? 'none' : 'auto')};
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 카드형 그림자 */
  transition: transform 0.3s ease;
  font-size : 18px;
  color : #555;
  
  
  &:hover {
    transform: translateY(-5px); /* 호버 시 살짝 떠오르는 효과 */
  }
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
const Bottom = ({ formFields , id , team  }) => {
  return (
    <BottomContainer>
      <Title>마이페이지 &gt; 팀 정보</Title>
      <FormList>
        {formFields.map((field) => (
          <FormItem key={field.name} className={field.name === "teamIntro" ? "textarea" : ""}>
            <Label>{field.label}</Label>
            <Value textarea={field.name === "teamIntro" ? "true" : "false"}>{field.value}</Value>
          </FormItem>
        ))}
      </FormList>
      <BtnEnd>
        <LinkButton to={`/mypage/${id}/${team}/members`}>
        멤버 보기
        </LinkButton>
      </BtnEnd>
    </BottomContainer>
  );
};

export default Bottom;
