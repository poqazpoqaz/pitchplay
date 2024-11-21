import magnifier from "../assets/magnifier.svg";
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
  border-radius: 15px;
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
`;

const MagnifierIcon = styled.img`
  position: absolute;
  right: 30px;
  width: 30px; /* 아이콘 크기 */
  height: 30px; /* 아이콘 크기 */
  cursor: pointer;
`;

function SearchInput({ onClick, onChange, gridArea, size, placeholder }) {
  return (
    <StyledDiv style={{ gridArea: gridArea }}>
      <StyledInput type="text" onChange={onChange} size={size} placeholder={placeholder} />
      <MagnifierIcon src={magnifier} onClick={onClick} />
    </StyledDiv>
  );
}

export default SearchInput;