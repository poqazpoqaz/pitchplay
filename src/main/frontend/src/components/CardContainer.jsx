import React, { useState, useEffect } from 'react';
import FieldCard from './FieldCard';  // FieldCard 컴포넌트 임포트
import CircularButton from '../components/CircularButton/CircularButton'; // CircularButton 임포트

function CardContainer() {
  const [fieldsData, setFieldsData] = useState([]); // stadiumData.json 데이터를 저장할 상태
  const [visibleCount, setVisibleCount] = useState(1); // 처음에 1개의 카드만 표시
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // JSON 데이터를 비동기적으로 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/stadiumData.json');  // stadiumData.json 파일 경로
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFieldsData(data);  // 데이터를 state에 저장
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error.message);  // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData();
  }, []);  // 컴포넌트가 처음 마운트될 때만 실행

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, fieldsData.length));
  };

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러가 있을 경우 표시할 내용
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      {fieldsData.slice(0, visibleCount).map((field) => (
        <FieldCard key={field.SVCID} {...field} />
      ))}

      {/* 더 보기 버튼 */}
      {visibleCount < fieldsData.length && (
        <CircularButton onClick={handleLoadMore} />
      )}
    </div>
  );
}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
};

export default CardContainer;
