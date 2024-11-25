import styled from "styled-components";
import TitleText from "../TitleText";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button";

const StyledDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledP = styled.p`
  margin-bottom: 20px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: space-between;

`;


function TeamLevel({ handleCheckboxClick, levels, selectedLevels, handleBeforeButtonClick, handleNextButtonClick }) {
  return (
    <StyledDiv1>
      <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
        <TitleText size="large">팀 레벨</TitleText>
      </div>
      <StyledP>팀 레벨을 선택해주세요. 중복 선택 가능합니다.</StyledP>
      <CheckboxWrapper>
        {levels.map((level) => (
          <Checkbox
            key={level}
            onClick={() => handleCheckboxClick(level)}
            isChecked={selectedLevels.includes(level)} // 개별 체크박스 상태 관리
          >
            {level}
          </Checkbox>
        ))}
      </CheckboxWrapper>

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
    </StyledDiv1>
  );
}

export default TeamLevel;