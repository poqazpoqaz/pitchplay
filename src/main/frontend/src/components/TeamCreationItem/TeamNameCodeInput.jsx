import TitleText from '../TitleText';
import Button from '../Button';
import LabelInput from '../LabelInput';
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  `;

const StyledP = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  text-align: left;
`;

const StyledDiv2 = styled.div`
  text-align: left;
`;

function TeamNameCodeInput({ teamName, teamCode, handleTeamNameChange, handleTeamCodeChange, teamNameError, teamCodeError, handleNextStep
}) {
  return (
    <StyledDiv>
      <div style={{borderBottom: "2px solid var(--main-color)", paddingBottom:"10px"}}>
        <TitleText size="large">팀 만들기</TitleText>
      </div>
      <StyledDiv2>
        <LabelInput
          id="name"
          text="팀 이름"
          type="text"
          placeholder="팀 이름을 입력하세요."
          onChange={handleTeamNameChange}
          value={teamName}
          isvalid={teamNameError}  // 유효성 검사 결과에 맞게 스타일 적용
        />
        {teamNameError && <p style={{ color: 'red' }}>{teamNameError}</p>}

        <LabelInput
          id="code"
          text="팀 코드"
          type="text"
          placeholder="팀 코드 입력"
          onChange={handleTeamCodeChange}
          value={teamCode}
          isvalid={teamCodeError}  // 유효성 검사 결과에 맞게 스타일 적용
        />
        <StyledP>
          팀 URL은 피치플레이 팀페이지 주소로 사용돼요
          https://www.pitchplay.com/team/(팀코드)
        </StyledP>
      </StyledDiv2>

      <Button onClick={handleNextStep} color="var(--main-color)" size="large">다음</Button>
    </StyledDiv>
  );
}

export default TeamNameCodeInput;