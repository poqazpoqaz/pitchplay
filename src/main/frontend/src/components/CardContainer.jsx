import React, { useState } from 'react';
import FieldCard from './FieldCard'; // FieldCard 컴포넌트 임포트
import CircularButton from '../components/CircularButton/CircularButton'; // CircularButton 임포트

const fields = [
  {
    id: 1,
    image: '/imgs/gujang.png',
    name: '신림체육공원',
    address: '서울 관악구 신림동 123-45',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 2,
    image: '/imgs/1.jpg',
    name: '관악체육공원',
    address: '서울 관악구 관악로 123',
    type: '잔디구장',
    area: '실내'
  },
  {
    id: 3,
    image: '/imgs/team.jpg',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 4,
    image: '/imgs/gujang.png',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 5,
    image: '/imgs/gujang.png',
    name: '신림체육공원',
    address: '서울 관악구 신림동 123-45',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 6,
    image: '/imgs/1.jpg',
    name: '관악체육공원',
    address: '서울 관악구 관악로 123',
    type: '잔디구장',
    area: '실내'
  },
  {
    id: 7,
    image: '/imgs/team.jpg',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 8,
    image: '/imgs/gujang.png',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 9,
    image: '/imgs/gujang.png',
    name: '신림체육공원',
    address: '서울 관악구 신림동 123-45',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 10,
    image: '/imgs/1.jpg',
    name: '관악체육공원',
    address: '서울 관악구 관악로 123',
    type: '잔디구장',
    area: '실내'
  },
  {
    id: 11,
    image: '/imgs/team.jpg',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
  {
    id: 12,
    image: '/imgs/gujang.png',
    name: '봉천체육공원',
    address: '서울 관악구 봉천동 789-12',
    type: '잔디구장',
    area: '실외'
  },
];

function CardContainer() {
  // visibleCount 상태: 표시할 카드의 수를 관리
  const [visibleCount, setVisibleCount] = useState(1); // 처음에 1개의 카드만 표시

  // 더 보기 버튼 클릭 시 실행되는 함수
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, fields.length)); // 더 많은 카드 표시
  };

  return (
    <div style={containerStyle}>
      {fields.slice(0, visibleCount).map((field) => (
        <FieldCard key={field.id} {...field} />
      ))}

      {/* 더 보기 버튼 */}
      {visibleCount < fields.length && (
        <CircularButton onClick={handleLoadMore} />
      )}
    </div>
  );
}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr', // 1열 (반응형 조정 가능)
  gap: '20px',               // 카드 간격
  maxWidth: '1000px',        // 컨테이너 최대 너비
  margin: '0 auto',          // 화면 중앙 정렬
  padding: '20px',           // 내부 여백
};

export default CardContainer;
