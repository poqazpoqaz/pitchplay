import React from 'react';
import { Link } from 'react-router-dom';  // Link 임포트
import './FieldCard.css';  // CSS 파일을 불러옵니다.

function FieldCard({ IMGURL, SVCNM, PLACENM, PAYATNM, TELNO, SVCID }) {
  return (
    <div className="card">
      <img src={IMGURL} alt={SVCNM} className="card-image" />
      <div className="info-container">
        <div className="info-box">
          <div className="info-text"><strong>시설명:</strong> {SVCNM}</div>
          <div className="info-text"><strong>위치:</strong> {PLACENM}</div>
          <div className="info-text"><strong>요금:</strong> {PAYATNM}</div>
          <div className="info-text"><strong>전화:</strong> {TELNO}</div>
          {/* Link로 상세보기 버튼을 변경 */}
          <Link to={`/stadium/${SVCID}`} className="button">상세보기</Link>
        </div>
      </div>
    </div>
  );
}

export default FieldCard;
