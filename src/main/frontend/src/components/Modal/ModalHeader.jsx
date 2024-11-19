import React from 'react';
import soccer from '../../assets/soccer.svg'; // SVG 파일 import
import './ModalHeader.css'; // CSS 파일 import

const ModalHeader = ({ closeModal }) => {
  return (
    <div className="modal-header">
      <h1 className="site-name">
      <span className="pitch">PITCH</span> {/* 첫 번째 줄 (PITCH) */}
        <span className="play">PLAY</span> {/* 두 번째 줄 (PLAY) */}
        </h1> {/* 사이트명 */}
      <img src={soccer} alt="Soccer" className="logo" /> {/* SVG 아이콘 */}
    </div>
  );
};

export default ModalHeader;
