import styled from "styled-components";
import soccer from "../../assets/soccer.svg";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트와 이미지 세로로 배치 */
  align-items: center;
  justify-content: center;
  font-size: 2rem; /* 화면 크기에 따라 텍스트 크기 조정 */
  color: #D9EBDB;
  font-family: 'Lalezar', sans-serif;
  position: relative;
  gap: 5px; /* PITCH와 PLAY 사이의 간격을 좁힘 */
  padding: 10px; /* 여백 추가 */
`;

const StyledImg = styled.img`
  width: 8rem; /* 화면 크기에 따라 이미지 크기 조정 */
  height: 8rem;
  position: absolute; /* 이미지를 절대 위치로 배치 */
  top: 50%; /* PITCH와 PLAY 텍스트의 중간에 위치 */
  transform: translateY(-50%); /* 정확히 가운데 위치하도록 조정 */
  filter: drop-shadow(-3px 3px 2px rgba(0, 0, 0, 0.3)); /* 그림자 효과 */
`;

const StyledH1 = styled.h1`
  margin-top: -15px; /* 기본 margin 값을 제거하여 간격을 줄임 */
`;

// 반응형 디자인을 위한 미디어 쿼리 추가
const OutInLogo = () => {
  return (
    <StyledDiv>
      <h1>PITCH</h1>
      <StyledImg src={soccer} />
      <StyledH1>PLAY</StyledH1>
    </StyledDiv>
  );
};

export default OutInLogo;
