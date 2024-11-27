import styled from "styled-components";
import TitleText from "../TitleText";
import Category from "../Category/Category";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

function TeamTime({ dayoptions, timeoptions, teamDay, teamTime, handleCategoryClick }) {
  return (
    <Wrapper>
      <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
        <TitleText size="large">팀 주 활동시간</TitleText>
      </div>
      <Text>주로 활동하는 요일과 시간을 선택해주세요.</Text>
      <Category
        categoryTitle="주 활동 요일 (중복가능)"
        options={dayoptions}
        selectedOptions={teamDay}
        handleCategoryClick={(item) => handleCategoryClick(item, 'day')}
      />
      <Category
        categoryTitle="주 활동 시간 (중복가능)"
        options={timeoptions}
        selectedOptions={teamTime}
        handleCategoryClick={(item) => handleCategoryClick(item, 'time')}
      />
    </Wrapper>
  )
}

export default TeamTime;