import styled from "styled-components";
import TitleText from "../TitleText";
import Button from "../Button";
import Category from "../Category/Category";

const StyledDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledP = styled.p`
  margin-bottom: 20px;
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: space-between;

`;

function TeamTime({ handleNextButtonClick, handleBeforeButtonClick, dayoptions, selectedDayOptions, houroptions, selectedHourOptions, handleDayCategoryClick, handleTimeCategoryClick }) {
    return (
        <StyledDiv1>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀 주 활동시간</TitleText>
            </div>
            <StyledP>주로 활동하는 요일과 시간을 선택해주세요.</StyledP>
            <Category
                categoryTitle="주 활동 요일 (중복가능)"
                options={dayoptions}
                selectedOptions={selectedDayOptions}
                handleCategoryClick={handleDayCategoryClick}
            />
            <Category
                categoryTitle="주 활동 시간 (중복가능)"
                options={houroptions}
                selectedOptions={selectedHourOptions}
                handleCategoryClick={handleTimeCategoryClick}
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
        </StyledDiv1>
    )
}

export default TeamTime;