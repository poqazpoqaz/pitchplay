import Category from "../Category/Category";
import styled from "styled-components";
import Button from "../Button";
import TitleText from "../TitleText";

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



function TeamMemberGender({ ageOptions, genderOptions, selectedAge, selectedGender, handleAgeClick, handleGenderClick, handleBeforeButtonClick, handleNextButtonClick }) {
    return (
        <StyledDiv1>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀원 구성요소</TitleText>
            </div>
            <StyledP>팀의 주요 나이대와 구성 인원을 선택해주세요.</StyledP>
            <Category
                categoryTitle="주요 나이 대 (중복가능)"
                options={ageOptions}
                selectedOptions={selectedAge}
                handleCategoryClick={handleAgeClick}
            />

            <Category
                categoryTitle="구성 인원"
                options={genderOptions}
                selectedOptions={selectedGender}
                handleCategoryClick={handleGenderClick}
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
    );
}

export default TeamMemberGender;