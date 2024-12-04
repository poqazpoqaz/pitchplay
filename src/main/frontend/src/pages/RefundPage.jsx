import React from 'react';

const RefundPage = ({gridArea}) => {
  return (
    <div style={{ gridArea: gridArea }}>
      <h1>환불하기</h1>
      <p>환불을 요청할 수 있는 페이지입니다.</p>
    </div>
  );
};

export default RefundPage;
