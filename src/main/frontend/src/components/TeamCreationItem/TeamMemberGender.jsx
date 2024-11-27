import Category from "../Category/Category";
import styled from "styled-components";
import TitleText from "../TitleText";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  `;

const Text = styled.p`
  margin-bottom: 20px;
`;

function TeamMemberGender({ageoptions, genderoptions, teamAge, teamGender, setTeamGender, handleCategoryClick}) {
    return (
        <Wrapper>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀원 구성요소</TitleText>
            </div>
            <Text>팀의 주요 나이대와 구성 인원을 선택해주세요.</Text>
            <Category
                categoryTitle="주요 나이 대 (중복가능)"
                options={ageoptions}
                selectedOptions={teamAge}
                handleCategoryClick={(item)=>handleCategoryClick(item,'age')}
            />

            <Category
                categoryTitle="구성 인원"
                options={genderoptions}
                selectedOptions={teamGender}
                handleCategoryClick={setTeamGender}
            />
        </Wrapper>
    );
}

export default TeamMemberGender;