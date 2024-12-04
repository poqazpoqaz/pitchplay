import React from 'react';

const HistoryPage = ({gridArea}) => {
  return (
    <div style={{ gridArea: gridArea }}>
      <h1>사용 내역</h1>
      <p>캐시 사용 내역을 확인할 수 있는 페이지입니다.</p>
    </div>
  );
};

export default HistoryPage;
