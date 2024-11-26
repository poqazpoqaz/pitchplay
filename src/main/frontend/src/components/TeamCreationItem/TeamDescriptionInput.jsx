import TitleText from "../TitleText";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

function TeamDescriptionInput({ teamDescription, setTeamDescription, teamDescriptionError }) {

  return (
    <Wrapper>
      <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
        <TitleText size="large">팀 소개</TitleText>
      </div>
      <p>300자 이하로 팀 소개글을 작성해주세요.</p>
      <StyledTextarea
        placeholder="팀 소개를 입력하세요."
        value={teamDescription}
        onChange={(e) => setTeamDescription(e.target.value)}
      />
      {teamDescriptionError && <p style={{ color: "red" }}>{teamDescriptionError}</p>}
    </Wrapper>
  );
}

export default TeamDescriptionInput;