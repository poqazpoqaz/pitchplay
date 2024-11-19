import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group'; // 애니메이션을 위한 react-transition-group import
import './Modal.css'; // 모달 스타일 import
import ModalHeader from './ModalHeader'; // ModalHeader 컴포넌트 import

const Modal = ({ isOpen, closeModal, children }) => {
  const nodeRef = useRef(null); // ref 생성

  return (
    <CSSTransition
      in={isOpen} // 모달이 열릴 때
      timeout={300} // 애니메이션 지속 시간 (ms)
      classNames="modal" // 애니메이션 클래스 이름 (CSS에서 정의)
      unmountOnExit // 모달이 닫히면 DOM에서 제거되도록 설정
      nodeRef={nodeRef} // nodeRef를 CSSTransition에 전달
    >
      <div className="overlay" ref={nodeRef}> {/* ref를 overlay에 전달 */}
        <div className="modal">
          {/* 모달 내부에 ModalHeader 추가 */}
          <ModalHeader />
          
          {/* 모달 내용 */}
          <button className="closeButton" onClick={closeModal}>
            X
          </button>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
//
