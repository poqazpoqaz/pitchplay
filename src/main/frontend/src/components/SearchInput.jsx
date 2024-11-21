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
  padding-right: 40px;
  border: 1px solid var(--main-color);
  border-radius: 15px;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  outline: none;

  &:hover {
    box-shadow: 1px 2px 3px #e9ecef;
  }
`;

const MagnifierIcon = styled.img`
  position: absolute;
  right: 10px;
  width: 20px; /* 아이콘 크기 */
  height: 20px; /* 아이콘 크기 */
  cursor: pointer;
`;

function SearchInput({onClick, onChange}) {
  return (
    <StyledDiv>
      <StyledInput type="text" onChange={onChange}/>
      <MagnifierIcon src={magnifier} onClick={onClick}/>
    </StyledDiv>
  );
}

export default SearchInput;