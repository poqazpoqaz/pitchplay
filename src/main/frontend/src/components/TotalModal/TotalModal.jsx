import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import TotalCalendar from '../Calendar/TotalCalendar';

const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
  height: 80vh; /* 고정 높이 설정 */
  max-height: 80vh; /* 최대 높이 */
  overflow-y: auto; /* 스크롤 기능 */
  scrollbar-width: none; /* 스크롤바 숨기기 (Firefox) */
  -ms-overflow-style: none; /* 스크롤바 숨기기 (IE) */
  
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 (Chrome, Safari) */
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Dropdown = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: pointer;

  &:focus {
    border-color: #1b4510;
    outline: none;
  }
`;

const Group = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  /* 버튼이 한 줄로 정렬되도록 조정 */
  justify-content: space-between; 
`;

const Button = styled.button`
  flex: 1; /* 버튼이 균등하게 너비를 가짐 */
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(props) => (props.active ? '#1b4510' : '#ccc')};
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#1b4510' : '#f9f9f9')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#16400c' : '#eaeaea')};
  }

  /* 버튼의 최소 너비를 설정해 버튼이 작아지지 않도록 함 */
  min-width: 80px;
`;

const FooterButton = styled(Button)`
  width: 100%;
  background-color: ${(props) =>
    props.variant === 'cancel' ? '#BBBBBB' : '#1B4510'};
  color: white;
  border-radius: 2px;
  margin-top: 20px;
`;

const TotalModal = ({ isOpen, onClose }) => {
  const [selectedButtons, setSelectedButtons] = useState([]); // gender, teamSize에서 선택
  const [region, setRegion] = useState(''); // location (지역)
  const [subRegion, setSubRegion] = useState(''); // 세부 지역
  const [matchingDate, setMatchingDate] = useState({ start: null, end: null }); // 매칭 날짜

  const toggleButtonSelection = (label) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const handleDateSelect = (dateRange) => {
    setMatchingDate(dateRange); // 선택된 날짜 범위 저장
  };

  const isActive = (label) => selectedButtons.includes(label);

  const handleSave = () => {
    const dataToSave = {
      loc: region.trim(), // region을 loc에 저장
      locDetail: subRegion.trim(), // subRegion을 locDetail에 저장
      gender: selectedButtons.filter((item) =>
        ['남성', '여성', '혼성'].includes(item)
      ),
      teamSize: selectedButtons.filter((item) =>
        ['4vs4', '5vs5', '6vs6', '7vs7'].includes(item)
      ),
      matchingDate,
    };

    localStorage.setItem('TotalSet', JSON.stringify(dataToSave)); // 로컬스토리지에 저장
    onClose(); // 모달 닫기
    alert('데이터가 저장되었습니다!');
};

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <ModalContent>
        <section>
          {/* Calendar */}
          <FormGroup>
            <FormLabel>날짜 선택</FormLabel>
            <Group>
              <TotalCalendar onSelect={handleDateSelect} />
            </Group>
          </FormGroup>

          {/* Location Selection */}
          <FormGroup>
            <FormLabel htmlFor="region">지역</FormLabel>
            <Group>
              <Dropdown
                value={subRegion}
                onChange={(e) => setSubRegion(e.target.value)}
              >
                <option value="">지역을 선택해주세요</option>
                <option value="강남구">강남구</option>
                <option value="서초구">서초구</option>
                <option value="마포구">마포구</option>
                <option value="광진구">광진구</option>
                <option value="동작구">동작구</option>
                <option value="고양시">고양시</option>
                <option value="강동구">강동구</option>
                <option value="송파구">송파구</option>
              </Dropdown>
            </Group>
          </FormGroup>

          {/* Gender Selection */}
          <FormGroup>
            <FormLabel>성별(복수선택 가능)</FormLabel>
            <Group>
              {['남성', '여성', '혼성'].map((label) => (
                <Button
                  key={label}
                  active={isActive(label)}
                  onClick={() => toggleButtonSelection(label)}
                >
                  {label}
                </Button>
              ))}
            </Group>
          </FormGroup>

          {/* Team Size Selection */}
          <FormGroup>
            <FormLabel>인원(복수선택 가능)</FormLabel>
            <Group>
              {['4vs4', '5vs5', '6vs6', '7vs7'].map((label) => (
                <Button
                  key={label}
                  active={isActive(label)}
                  onClick={() => toggleButtonSelection(label)}
                >
                  {label}
                </Button>
              ))}
            </Group>
          </FormGroup>
        </section>
        <footer>
          <FooterButton onClick={handleSave}>저장하기</FooterButton>
          <FooterButton variant="cancel" onClick={onClose}>
            취소
          </FooterButton>
        </footer>
      </ModalContent>
    </Modal>
  );
};

export default TotalModal;
