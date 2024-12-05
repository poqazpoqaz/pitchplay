import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기

const StyledInput = styled.input`
    border-radius: 10px;
    border: 1px solid var(--line-color);
    padding: 10px;
    font-size: ${(props) => {
    switch (props.size) {
      case 'xsmall': 
      return '15px';
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

  @media (max-width: 760px) {
    padding: 6px;
    font-size: ${(props) => {
      switch (props.size) {
        case 'xsmall': 
          return '12px';  // xsmall 화면에서 더 작은 폰트 크기
        case 'small':
          return '16px';  // small 화면에서 더 작은 폰트 크기
        case 'medium':
          return '20px';  // medium 화면에서 더 작은 폰트 크기
        case 'large':
          return '24px';  // large 화면에서 더 작은 폰트 크기
        default:
          return '18px';  // 기본값 설정
      }
    }};
  }
    `;

function Input({ type, placeholder, onChange, value, gridArea, size}) {
  return (
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        size={size}
        style={{ gridArea: gridArea }}
      />
  );
}

export default Input;
