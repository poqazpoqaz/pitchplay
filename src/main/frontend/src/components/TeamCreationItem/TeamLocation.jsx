import Dropdown from "../Dropdown";
import Button from "../Button";
import styled from "styled-components";
import TitleText from "../TitleText";

const StyledDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const StyledDiv2 = styled.div`
  display: flex;
  justify-content: space-between;

`;

const StyledP2 = styled.p`
    font-size: 14px;
    color: rgb(54, 54, 54);
    font-weight: bold;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
`;

function TeamLocation({ locOptions, cityOptions, handleCityChange, handleLocChange, selectedLoc, selectedCity, handleBeforeButtonClick, handleNextButtonClick }) {

    return (
        <StyledDiv1>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀 주 활동 장소</TitleText>
            </div>
            <p>팀이 주로 활동하는 장소를 선택해주세요.</p>
            <div>
                <StyledP2>주 활동 도시</StyledP2>
                <Dropdown
                    options={cityOptions}
                    onChange={handleCityChange}
                    selected={selectedCity}
                    text="도시선택"
                />
                <StyledP2>주 활동 지역</StyledP2>
                <Dropdown
                    options={locOptions}
                    onChange={handleLocChange}
                    selected={selectedLoc}
                    text="구 선택"
                />
            </div>
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

export default TeamLocation;