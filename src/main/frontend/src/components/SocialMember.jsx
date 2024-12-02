import styled from "styled-components";
import CircleImg from "./CircleImg";

const Wrapper = styled.div`
  padding: 20px; /* 내부 여백 */
  background-color: #F1F1F1;
  border-radius: 12px; /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */

h2 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: 700; 
  color: #000000; 
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.5);
  padding: 10px 15px;
  border-radius: 8px; 
}
`

const Members = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 레이아웃 */
  gap: 20px; /* 항목 간의 간격 */
  align-content: center;
`;

const SubWrapper = styled.div`
  display: grid;
  grid-template: 
    "nickname img" 50px
    / 3fr 50px; 
  align-items: center; /* 세로 정렬 */
  padding: 10px 15px; /* 카드 내부 여백 */
  background: #ffffff; /* 카드 배경 */
  border: 1px solid #ddd; /* 얇은 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 카드 그림자 */
  transition: transform 0.2s, box-shadow 0.2s; /* 호버 애니메이션 */

  &:hover {
    transform: translateY(-4px); /* 살짝 올라오는 효과 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
  }

  p {
    grid-area: nickname;
    margin: 0;
    font-size: 16px;
    font-weight: 600; /* 글씨 강조 */
    color: #333;
  }
`;

function SocialMember({ gridArea, socialMembers }) {
  return (
    <Wrapper style={{ gridArea: gridArea }}>
      <h2>선수 명단</h2>
      <Members>
        {socialMembers.map((member, index) => (
          <SubWrapper key={index}>
            <p>{member.nickname}</p>
            <CircleImg src={member.src} gridArea="img" />
          </SubWrapper>
        ))}
      </Members>
    </Wrapper>
  );
}

export default SocialMember;