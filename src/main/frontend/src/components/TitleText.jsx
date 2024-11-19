import styled from "styled-components";

// Poppins 폰트 패밀리
// 사용 예제: <TitleText color="black" size="large">텍스트</TitleText>
const StyledH1 = styled.h1`
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '20px';
      case 'medium':
        return '26px';
      case 'large':
        return '30px';
      default:
        return '24px';  // 기본값 설정
    }
  }};
  color: ${(props) => props.color};
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
`;

function TitleText({ color, size, children }) {
  return (
    <StyledH1 color={color} size={size}>
      {children}
    </StyledH1>
  );
}

export default TitleText;