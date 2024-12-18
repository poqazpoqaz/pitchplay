// components/Modal/ReservationModal.js
import React, { useRef } from 'react';
import { motion } from 'framer-motion'; // Framer Motion import
import './ReservationModal.css'; // 모달 스타일 import
import ModalHeader from '../../../components/Modal/ModalHeader'; // ModalHeader 컴포넌트 import
import StadiumReservation from '../StadiumReservation'; // 예약 컴포넌트 import

// stadiumCost 받아옴
const ReservationModal = ({ isOpen, closeModal, reservedTimeSlots, setReservedTimeSlots, stadiumCost }) => {
  const nodeRef = useRef(null); // ref 생성

  // 모달 애니메이션 설정
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 }, // 모달이 처음에는 투명하고 작은 상태
    visible: { opacity: 1, scale: 1 },   // 모달이 나타날 때 완전한 크기와 불투명 상태
    exit: { opacity: 0, scale: 0.9 },    // 모달이 닫힐 때의 상태
  };

  const overlayVariants = {
    hidden: { 
      backgroundColor: 'rgba(0, 0, 0, 0)',  // 배경이 처음에는 투명 상태
      backdropFilter: 'blur(0px)'  // 처음에는 배경이 흐려지지 않음
    },
    visible: { 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경이 반투명으로 변화
      backdropFilter: 'blur(10px)' // 배경이 블러 처리됨
    },
  };

  return (
    <>
      {/* 모달 오버레이 애니메이션 */}
      {isOpen && (
        <motion.div
          className="overlay"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}  // 배경 색상 및 블러 애니메이션 적용
          transition={{ duration: 0.5 }} // 애니메이션 지속 시간
          ref={nodeRef}
        >
          <motion.div
            className="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}  // 모달 애니메이션 적용
            transition={{ duration: 0.5 }} // 애니메이션 지속 시간
          >
            {/* 모달 헤더 */}
            <ModalHeader />

            {/* 닫기 버튼 */}
            <button className="closeButton" onClick={closeModal}>
              X
            </button>

            {/* 예약 컴포넌트 */}
            <div className="content">
              <StadiumReservation
                reservedTimeSlots={reservedTimeSlots}
                setReservedTimeSlots={setReservedTimeSlots}
                stadiumCost={stadiumCost} // 비용전달 수정함
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ReservationModal;
