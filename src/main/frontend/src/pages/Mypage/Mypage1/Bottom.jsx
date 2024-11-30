import React from 'react';
import styled from 'styled-components';

const BottomContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / -1;
  grid-row: 2;
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
  font-size: 1rem;
  font-weight: bold;
  width: 120px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: ${(props) => (props.textarea == "true" ? '100px' : 'auto')};
  resize: ${(props) => (props.textarea == "true" ? 'none' : 'auto')};
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #07550C;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
  max-width: 200px;
  align-self: center;
`;

const Bottom = ({ formFields, isEditable, handleInputChange, toggleEdit }) => {
  return (
    <BottomContainer>
      <Title>마이페이지 &gt; 내정보</Title>
      <FormList>
        {formFields.map((field) => (
          <FormItem key={field.name} className={field.name === "intro" ? "textarea" : ""}>
            <Label>{field.label}</Label>
            <Input
              type="text"
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
              disabled={!isEditable}
              textarea={field.name == "intro" ? "true" : "false"}
            />
          </FormItem>
        ))}
      </FormList>
      <EditButton onClick={toggleEdit}>
        {isEditable ? '수정 완료' : '프로필 수정'}
      </EditButton>
    </BottomContainer>
  );
};

export default Bottom;
