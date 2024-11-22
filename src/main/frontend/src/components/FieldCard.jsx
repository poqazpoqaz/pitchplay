import React from 'react';
import './FieldCard.css';  // CSS 파일을 불러옵니다.

function FieldCard({ image, name, address, type, area }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="info-container">
        <div className="info-box">
          <div className="info-text">{name}</div>
          <div className="info-text">{address}</div>
          <div className="info-text">{type}</div>
          <div className="info-text">{area}</div>
          <button className="button">상세보기</button>
        </div>
      </div>
    </div>
  );
}

export default FieldCard;
