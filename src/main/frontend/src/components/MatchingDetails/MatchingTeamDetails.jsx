import styled from "styled-components";
import versus from "./versus.svg";
import {motion} from "framer-motion";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: 
  'team1 team2' 1fr / 1fr 1fr;
  width: 100%;
  height: 100%;
`;

// vs 이미지 중앙에 배치하기
const VersusImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; 
  height: 50px;
  z-index: 100;
`;

// 팀 1 스타일
const TeamWrapper1 = styled.div`
  background: #164f92;
  grid-area: team1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0px 0px 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// 팀 2 스타일
const TeamWrapper2 = styled.div`
  background: #da2849;
  grid-area: team2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 15px 15px 0px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// 팀 내부 스타일
const InnerTeam = styled.div`
  text-align: center;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 95%;
  height: 95%;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  p {
    margin: 12px 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
  }

  img {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 16px;
    border: 3px solid #fff;
  }

`;

function MatchingTeamDetails({ teams, gridArea }) {
  return (
    <Wrapper style={{ gridArea: gridArea }}>
      <VersusImage src={versus}/>
      <TeamWrapper1>
        <InnerTeam>
          <img src={teams.team1.src} alt={teams.team1.name} />
          <h1>{teams.team1.name}</h1>
        </InnerTeam>
      </TeamWrapper1>
      <TeamWrapper2>
        {teams.team2.name ? (
          <InnerTeam>
            <img src={teams.team2.src} alt={teams.team2.name} />
            <h1>{teams.team2.name}</h1>
          </InnerTeam>
        ) : (
          <InnerTeam>
            <p>팀 매칭을</p>
            <p>신청해주세요.</p>
          </InnerTeam>
        )}
      </TeamWrapper2>
    </Wrapper>
  );
}

export default MatchingTeamDetails;