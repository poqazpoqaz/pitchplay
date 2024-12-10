import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import TotalCalendar from '../Calendar/TotalCalendar';

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 5px;
  border-radius: 10px;
  max-width: 80%;
  width: 90%;
  margin: 0 auto;
  height: 80vh; /* 고정 높이 */
  overflow-y: auto; /* 스크롤 가능 */
  display: flex;
  flex-direction: column; /* Flexbox로 레이아웃 정렬 */
  justify-content: space-between; /* Footer가 항상 아래쪽에 위치 */

  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none; /* 웹킷 기반 브라우저에서 스크롤바 숨기기 */
  }

  -ms-overflow-style: none; /* IE에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 8px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Group = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between; /* 버튼 간격 균등 분배 */
  width: 100%; /* 부모 크기에 맞춤 */
`;

const Button = styled.button`
  flex: 1; /* 버튼의 크기를 균등하게 분배 */
  padding: 10px 0; /* 상하 여백으로 버튼 높이를 조정 */
  font-size: 0.8rem
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#1B4510' : '#f5f5f5')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.active ? '#1B4510' : '#e0e0e0')};
  }
`;

const FooterButton = styled(Button)`
  width: 100%;
  background-color: ${(props) =>
    props.variant === 'cancel' ? '#BBBBBB' : '#1B4510'};
  color: white;
  border-radius: 2px;
`;

const TotalModal = ({ isOpen, onClose }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleButtonSelection = (label) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (label) => selectedButtons.includes(label);

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <ModalContent>
        <section>
          {/* Calendar */}
          <FormGroup>
            <FormLabel>날짜 선택</FormLabel>
            <Group>
              <TotalCalendar />
            </Group>
          </FormGroup>

          {/* Location Selection */}
          <FormGroup>
            <FormLabel htmlFor="region">지역</FormLabel>
            <Group>
              <Dropdown id="region">
                <option>지역을 선택해주세요</option>
                <option>서울</option>
                <option>부산</option>
                <option>대구</option>
              </Dropdown>
              <Dropdown>
                <option>세부지역을 선택해주세요</option>
                <option>강남구</option>
                <option>서초구</option>
                <option>해운대구</option>
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
          <FooterButton variant="search">다음</FooterButton>
        </footer>
      </ModalContent>
    </Modal>
  );
};

export default TotalModal;
