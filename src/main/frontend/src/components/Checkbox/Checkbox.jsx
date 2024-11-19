import React, { Children, useState } from 'react';
// 체크박스 SVG를 사용합니다.
import CheckedSVG from './checked.svg';
import UncheckedSVG from './unchecked.svg';

const Checkbox = ({ children, isChecked }) => {
  return (
    <label>
      {/* isChecked가 true이면 CheckedSVG, 아니면 UncheckedSVG를 가져옵니다 */}
      <img
        src={isChecked ? CheckedSVG : UncheckedSVG} 
        alt="checkbox" // 이미지에 대한 이름지어주기
      />
      {/* children으로 전달된 텍스트를 표시 */}
      {children} 
    </label>
  );
};

export default Checkbox;