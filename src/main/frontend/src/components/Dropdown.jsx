import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// 드롭다운 Wrapper 
const DropdownWrapper = styled.div`
  position: relative;
`;

// 드롭다운
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

  &:hover {
    border-color: #888;
  }
`;
// 드롭다운 목록 스타일
const DropdownList = styled(motion.div)`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 3px;
  overflow: hidden;
`;

// 드롭다운 항목 스타일
const DropdownItem = styled.div`
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
    

  &:hover {
    background-color: #f0f0f0;
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
          animate={{ opacity: 1}}
          transition={{ duration: 0.8 }}
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