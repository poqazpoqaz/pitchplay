import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${props => props.isvalid === "true" ? 'var(--line-color)' : '#BE2E22'};
  padding: 10px;
  margin-top: 5px;
`;

function Input({ id, text, type, placeholder, onChange, value, isvalid }) {
  return (
    <StyledDiv>
      <label htmlFor={id} style={{fontWeight: "bold"}}>{text}</label>
      <StyledInput
        id={id} // label과 input 연결 id
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        isvalid={isvalid.toString()} />
    </StyledDiv>
  );
}

export default Input;

// 사용법
{/* <form onSubmit={handleSubmit}>
<Input
  id="name"
  text="성명"
  type="text"
  placeholder="이름을 입력해주세요"
  value={name}
  onChange={(e) => handleChange(e, setName, (value) => value.length > 0, "name")}
  isvalid={isValid.name}
/> */}