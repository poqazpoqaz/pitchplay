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
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
`;

const Button = styled.button`
  padding: 10px 20px;
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
  const [matchingDate, setMatchingDate] = useState(''); // 매칭 날짜

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
      location: `${region} ${subRegion}`.trim(),
      gender: selectedButtons.filter((item) =>
        ['남성', '여성', '혼성'].includes(item)
      ),
      teamSize: selectedButtons.filter((item) =>
        ['4 vs 4', '5 vs 5', '6 vs 6', '7 vs 7', '전체'].includes(item)
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
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">지역을 선택해주세요</option>
                <option value="서울">서울</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
              </Dropdown>
              <Dropdown
                value={subRegion}
                onChange={(e) => setSubRegion(e.target.value)}
              >
                <option value="">세부지역을 선택해주세요</option>
                <option value="강남구">강남구</option>
                <option value="서초구">서초구</option>
                <option value="해운대구">해운대구</option>
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
              {['4 vs 4', '5 vs 5', '6 vs 6', '7 vs 7', '전체'].map((label) => (
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
