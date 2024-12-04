import React from "react";
import TitleText from "../TitleText";
import LabelInput from "../LabelInput";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LabelDiv = styled.div`
  text-align: left;
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  text-align: left;
`;

const TeamNameCodeInput = ({ teamName, teamCode, setTeamName, setTeamCode, teamNameError, teamCodeError }) => (

  <Wrapper>
    <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
      <TitleText size="large">팀 만들기</TitleText>
    </div>
    <LabelDiv>
      <LabelInput
        id="name"
        text="팀 이름"
        type="text"
        placeholder="팀 이름을 입력하세요."
        onChange={(e) => setTeamName(e.target.value)}
        value={teamName}
      />
      {teamNameError && <p style={{ color: "red" }}>{teamNameError}</p>}
    </LabelDiv>
    <LabelDiv>
      <LabelInput
        id="code"
        text="팀 코드"
        type="text"
        placeholder="팀 코드를 입력하세요."
        onChange={(e) => setTeamCode(e.target.value)}
        value={teamCode}
      />
      {teamCodeError && <p style={{ color: "red" }}>{teamCodeError}</p>}
    </LabelDiv>
    <Description>
      팀 URL은 피치플레이 팀페이지 주소로 사용돼요: https://www.pitchplay.com/team/(팀코드)
    </Description>
  </Wrapper>
);

export default TeamNameCodeInput;