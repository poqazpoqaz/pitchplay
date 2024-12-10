import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// 드롭다운 Wrapper
const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  `;
  // z-index: 100; 이거 몰라서 뺌일단

// 드롭다운 버튼 스타일
const DropdownButton = styled.div`
  background-color: #ffffff;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  color: #6F6F6F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap; 

  &:hover {
    border-color: #888;
  }
  @media (max-width: 760px) {
    padding: 8px; /* 항목 패딩 조정 */
    font-size: 0.6rem;
  }
`;

// 드롭다운 목록 스타일
const DropdownList = styled(motion.div)`
  position: absolute;
  width: 100%;
  max-height: 200px; 
  background-color: #ffffff;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 3px;
  z-index: 100;
  overflow-y : auto;
  white-space: nowrap; /* 텍스트가 줄 바꿈 없이 한 줄로 유지됨 */
`;

// 드롭다운 항목 스타일
const DropdownItem = styled.div`
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap; /* 텍스트가 줄 바꿈 없이 한 줄로 유지됨 */

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 760px) {
    padding: 8px; /* 항목 패딩 조정 */
    font-size: 0.6rem;
  }
`;

function Dropdown({ options, selected, onChange, text, gridArea }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onChange(value);
    // 항목을 선택한 후 드롭다운 닫기
    setIsOpen(false);
  };

  return (
    <DropdownWrapper style={{gridArea: gridArea}}>
      <DropdownButton onClick={handleToggle}>
        {selected ? selected : `${text}`}
        {/* 화살표 아이콘 */}
        <span>{isOpen ? "▲" : "▼"}</span>
      </DropdownButton>

      {isOpen && (
        <DropdownList
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;


// Dropdown 사용방법
// <Dropdown
// options={options}        // 드롭다운 옵션 목록
// selected={selectedOption} // 선택된 항목
// onChange={handleSelectChange} // 선택 시 상태 업데이트 함수
// text="지역선택" // 드롭다운 메인
// />