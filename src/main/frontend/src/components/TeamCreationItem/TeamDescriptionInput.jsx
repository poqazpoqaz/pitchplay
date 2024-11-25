import React, { useState } from "react";
import TitleText from "../TitleText";
import Button from "../Button";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextarea = styled.textarea`
  width: 80%;
  height: 150px;
  padding: 10px;
  border: 2px solid var(--main-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  resize: none;
  outline: none;
  margin: 0 auto;

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  &.error {
    border-color: red;
  }
`;

function TeamDescriptionInput({
  handleNextButtonClick,
  handleBeforeButtonClick,
  handleTeamDescription,
  description
}) {

  return (
    <StyledDiv>
      <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
        <TitleText size="large">팀 소개</TitleText>
      </div>
      <p>300자 이하로 팀 소개글을 작성해주세요.</p>
      <StyledTextarea
        placeholder="팀 소개를 입력하세요."
        value={description}
        onChange={handleTeamDescription}
      />
      <StyledDiv2>
        <Button color="var(--main-color)" size="large" onClick={handleBeforeButtonClick}>
          이전
        </Button>
        <Button
          color="var(--main-color)"
          size="large"
          onClick={handleNextButtonClick}
        >
          다음
        </Button>
      </StyledDiv2>
    </StyledDiv>
  );
}

export default TeamDescriptionInput;