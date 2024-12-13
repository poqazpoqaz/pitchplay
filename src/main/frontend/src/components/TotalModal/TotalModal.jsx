import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import TotalCalendar from '../Calendar/TotalCalendar';

// 스타일 정의
const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
  height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
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
  justify-content: space-between;
`;

const Button = styled.button`
  flex: 1;
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

  min-width: 80px;
`;

const FooterButton = styled(Button)`
  width: 100%;
  background-color: ${(props) =>
    props.variant === 'cancel' ? '#BBBBBB' : '#1B4510'};
  color: white;
  border-radius: 2px;
  margin-top: 10px;
`;

const FooterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

// TotalModal 컴포넌트
const TotalModal = ({ isOpen, onClose }) => {
  // 상태 관리
  const [selectedButtons, setSelectedButtons] = useState([]); // 선택된 버튼 (성별, 팀 크기)
  const [region, setRegion] = useState(''); // 선택된 지역
  const [subRegion, setSubRegion] = useState(''); // 선택된 세부 지역
  const [matchingDate, setMatchingDate] = useState({ start: null, end: null }); // 선택된 날짜

  // 버튼 선택/해제 함수
  const toggleButtonSelection = (label) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label) // 이미 선택된 경우 제거
        : [...prev, label] // 선택되지 않은 경우 추가
    );
  };

  // 날짜 선택 함수
  const handleDateSelect = (dateRange) => {
    setMatchingDate(dateRange); // 선택된 날짜 범위 업데이트
  };

  // 버튼 활성화 여부 확인 함수
  const isActive = (label) => selectedButtons.includes(label);

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    const dataToSave = {
      loc: region.trim(), // 지역 정보 저장
      locDetail: subRegion.trim(), // 세부 지역 정보 저장
      gender: selectedButtons.filter((item) =>
        ['남성', '여성', '혼성'].includes(item)
      ),
      teamSize: selectedButtons.filter((item) =>
        ['4vs4', '5vs5', '6vs6', '7vs7'].includes(item)
      ),
      matchingDate: matchingDate.start && matchingDate.end ? matchingDate : null, // 날짜 정보 저장
    };

    localStorage.setItem('TotalSet', JSON.stringify(dataToSave)); // 로컬스토리지에 데이터 저장
    onClose(); // 모달 닫기
    alert('데이터가 저장되었습니다!');
  };

  // 초기화 버튼 클릭 시 실행되는 함수
  const handleReset = () => {
    setSelectedButtons([]); // 모든 버튼 선택 초기화
    setRegion(''); // 지역 초기화
    setSubRegion(''); // 세부 지역 초기화
    setMatchingDate({ start: null, end: null }); // 날짜 초기화
    localStorage.removeItem('TotalSet'); // 로컬스토리지 초기화
  };

  // 모달이 열릴 때 실행되는 초기화 로직
  useEffect(() => {
    if (isOpen) {
      handleReset(); // 모달 열릴 때 모든 필터 초기화
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <ModalContent>
        <section>
          {/* 날짜 선택 */}
          <FormGroup>
            <FormLabel>날짜 선택</FormLabel>
            <Group>
              <TotalCalendar onSelect={handleDateSelect} />
            </Group>
          </FormGroup>

          {/* 지역 선택 */}
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

          {/* 성별 선택 */}
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

          {/* 인원 선택 */}
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
          {/* 저장 버튼 */}
          <FooterGroup>
            <FooterButton onClick={handleSave}>저장하기</FooterButton>
          </FooterGroup>
          {/* 취소 버튼 */}
          <FooterButton variant="cancel" onClick={onClose}>
            취소
          </FooterButton>
        </footer>
      </ModalContent>
    </Modal>
  );
};

export default TotalModal;
