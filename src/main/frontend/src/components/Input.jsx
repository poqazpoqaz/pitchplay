import React from 'react';
import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기
const StyledInput = styled.input`
  border-radius: 10px;
  // 유효성 검사 결과에 따라 색상 변경
  border: 1px solid ${props => props.isvalid == "true" ? 'var(--line-color)' : '#BE2E22'};  
  padding: 10px;
  `
  ;


function Input({ id, type, placeholder, onChange, isvalid}) {
  
  return <StyledInput 
                id={id} // label과 input 연결 id
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                isvalid={isvalid.toString()}/>;
}

export default Input;

//사용법
{/* <label htmlFor="username">이메일</label>
<Input
  id="username"
  type="email"
  placeholder="이메일을 작성해주세요"
  onChange={handleChange}
  value={value}
  isvalid={isValid} /> */}