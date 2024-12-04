import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;


const StyledLabel = styled.label`
  font-weight: bold;
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
  }}
    `

const StyledInput = styled.input`
    border-radius: 10px;
    border: 1px solid ${props => props.$isvalid =="true" ? 'var(--line-color)' : 'var(--main-color)'};
    padding: 10px;
    margin-top: 5px ;
      font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '10px';
      case 'medium':
        return '20px';
      case 'large': 
        return '24px';
      default:
        return '16px';  // 기본값 설정
    }
  }}
    `;

function Input({ id, text, size, type, placeholder, onChange, value, gridArea, min, max, isvalid }) {
  return (
    <StyledDiv
      style={{ gridArea: gridArea }}>
      <StyledLabel htmlFor={id} size={size}>{text}</StyledLabel>
      <StyledInput
        id={id} // label과 input 연결 id
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        $isvalid={isvalid}
      />
    </StyledDiv>
  );
}

export default Input;

// 사용법
{/* <LabelInput
  id="name"
  text="성명"
  type="text"
  placeholder="예) 홍길동"
  onChange={handleName}
  value={name}
  isvalid={isNameValid}
/> */}