import React from 'react';
import Modal from '../../../../components/Modal/Modal'; // Framer Motion Modal import
import styled from 'styled-components';
import { formattedDate } from "../../../../utils/formattedDate";

const ModalContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  font-size: 24px;
  color: #07550C; /* 녹색 제목 */
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
`;

const Highlight = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
  text-align: left;

  label {
    font-weight: bold;
    display: block;
    margin: 10px 0 5px;
    font-size: 14px;
  }

`;

const WarningText = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: red; /* 경고 빨간색 */
  text-align: left;
  margin-bottom: 10px;
  letter-spacing : 0.1;
`;

const CancelButton = styled.button`
  background-color: #07550C;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #06430a;
  }
`;

const CancelModal = ({ match, isOpen, onClose, onCancelMatch }) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    onCancelMatch(match); // 부모의 취소 함수 호출
    onClose(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}> {/* `onClose`를 `closeModal`로 전달 */}
        <Title>예약 취소</Title>
        <Subtitle>취소 수수료를 제외하고 환불됩니다.</Subtitle>
      <ModalContainer>
        <Highlight>{match?.location || '예약된 장소 정보 없음'}</Highlight>
        <hr />
        <InfoContainer>
          <label>예약금</label>
          <p>{match?.amount || '50,000원'}</p>
          <WarningText>수수료 발생 시 사용 포인트 우선 차감 후 차액이 캐시로 지급됩니다.</WarningText>
          <label>환불 금액</label>
          <p>{match?.refundAmount || '48,000원'}</p>
          <label>위치</label>
          <p>{match?.location || '서울특별시 금천구 가산디지털로 151'}</p>
          <label>매칭 시간</label>
          <p>{formattedDate(match?.matchingDate) || '2024-12-12 18:30'}</p>
        </InfoContainer>
        <CancelButton onClick={handleCancel}>예약 취소</CancelButton>
      </ModalContainer>
    </Modal>
  );
};

export default CancelModal;
