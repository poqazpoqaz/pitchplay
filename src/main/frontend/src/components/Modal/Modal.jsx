import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Modal.css';
import ModalHeader from './ModalHeader';

const Modal = ({ isOpen, closeModal, children }) => {
  const nodeRef = useRef(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const overlayVariants = {
    hidden: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px)',
    },
    visible: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="overlay"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      transition={{ duration: 0.5 }}
      ref={nodeRef}
      onClick={closeModal} // 오버레이 클릭 시 모달 닫기
    >
      <motion.div
        className="modal"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 중단
      >
        <ModalHeader />
        <button className="closeButton" onClick={closeModal}>
          X
        </button>
        <div className="content">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
