import magnifier from "../../assets/magnifier.svg";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  min-height: 25px;
`;

const StyledInput = styled.input`
  padding: 10px;
  padding-right: 60px;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  outline: none;
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '10px';
      case 'medium':
        return '18px';
      case 'large':
        return '20px';
      case 'xlarge':
        return '30px';
      default:
        return '15px';  // 기본값 설정
    }
  }};

  &:hover {
    box-shadow: 1px 2px 3px #e9ecef;
  }

  /* 미디어 쿼리 추가 */
  @media (max-width: 760px) {
    font-size: ${(props) => (props.size === 'small' ? '12px' : '14px')};
    padding: 5px;
    height: auto;
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.size === 'small' ? '10px' : '12px')};
    height: auto;
  }
`;

const MagnifierIcon = styled.img`
  position: absolute;
  right: 30px;
  width: 30px; /* 아이콘 크기 */
  height: 30px; /* 아이콘 크기 */
  cursor: pointer;

  /* 미디어 쿼리 추가 */
  @media (max-width: 760px) {
    width: 20px;
    right: 25px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    right: 20px;
  }
`;

function SearchInputFAQ({ onClick, onChange, gridArea, size, placeholder }) {
  return (
    <StyledDiv style={{ gridArea: gridArea }}>
      <StyledInput type="text" onChange={onChange} size={size} placeholder={placeholder} />
      <MagnifierIcon src={magnifier} onClick={onClick} />
    </StyledDiv>
  );
}

export default SearchInputFAQ;