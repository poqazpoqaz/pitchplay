import Dropdown from "../Dropdown";
import styled from "styled-components";
import TitleText from "../TitleText";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const Text = styled.p`
    font-size: 14px;
    color: rgb(54, 54, 54);
    font-weight: bold;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
`;

function TeamLocation({ cityoptions, locoptions, teamCity, teamLoc, setTeamCity, setTeamLoc }) {


    return (
        <Wrapper>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀 주 활동 장소</TitleText>
            </div>
            <p>팀이 주로 활동하는 장소를 선택해주세요.</p>
            <div>
                <Text>주 활동 도시</Text>
                <Dropdown
                    options={cityoptions}
                    onChange={setTeamCity}
                    selected={teamCity}
                    text="도시선택"
                />
                <Text>주 활동 지역</Text>
                <Dropdown
                    options={locoptions}
                    onChange={setTeamLoc}
                    selected={teamLoc}
                    text="구 선택"
                />
            </div>
        </Wrapper>
    )
}

export default TeamLocation;