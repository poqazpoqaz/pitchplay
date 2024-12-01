// 체크박스 SVG를 사용합니다.
import CheckedSVG from './checked.svg';
import UncheckedSVG from './unchecked.svg';
import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  align-items: center; 
  gap: 5px; 
`;

const Checkbox = ({ children, isChecked, onClick }) => {
  return (
    <StyledLabel onClick={onClick}>
      {/* isChecked가 true이면 CheckedSVG, 아니면 UncheckedSVG를 가져옵니다 */}
      <img
        src={isChecked ? CheckedSVG : UncheckedSVG}
        alt="checkbox" // 이미지에 대한 이름지어주기
      />
      {/* children으로 전달된 텍스트를 표시 */}
      {children}
    </StyledLabel>
  );
};

export default Checkbox;