import styled from "styled-components";
import TitleText from "../TitleText";
import Checkbox from "../Checkbox/Checkbox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function TeamLevel({ levels, teamLevel, handleCategoryClick }) {


  return (
    <Wrapper>
      <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
        <TitleText size="large">팀 레벨</TitleText>
      </div>
      <Text>팀 레벨을 선택해주세요. 중복 선택 가능합니다.</Text>
      <CheckboxWrapper>
        {levels.map((level) => (
          <Checkbox
            key={level}
            onClick={() => handleCategoryClick(level, 'level')}
            isChecked={(teamLevel || []).includes(level)}
          >
            {level}
          </Checkbox>
        ))}
      </CheckboxWrapper>
    </Wrapper>
  );
}

export default TeamLevel;