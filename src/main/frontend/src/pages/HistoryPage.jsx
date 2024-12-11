import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams 사용
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.active ? '#1B4510' : '#ccc')};
  background-color: ${(props) => (props.active ? '#1B4510' : '#f5f5f5')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#16530c' : '#e0e0e0')};
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 40px 0;
`;

const Divider = styled.div`
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: ${(props) => (props.type === 'positive' ? '#1B4510' : '#ff0000')};
`;

const Actbox = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

// Component
const HistoryPage = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 id 파라미터 가져오기
  const [filter, setFilter] = useState('전체'); // 현재 필터 상태
  const [paymentData, setPaymentData] = useState([]); // 결제 데이터

  useEffect(() => {
    // 데이터 불러오기
    const fetchData = async () => {
      try {
        const response = await fetch('/data/paymentData.json'); // JSON 파일 경로
        const data = await response.json();
        // 사용자 ID에 맞는 데이터만 필터링
        const filteredData = data.filter((item) => item.userId === id);
        setPaymentData(filteredData);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [id]);

  // 필터링된 데이터 가져오기
  const getFilteredData = () => {
    if (filter === '전체') {
      return paymentData;
    }
    return paymentData.filter((item) => item.paymentStatus === filter);
  };

  const filteredData = getFilteredData();

  return (
    <Container style={{ gridArea: gridArea }}>
      <Actbox>
        <Header>
          <h2>캐시 상세 내역</h2>
        </Header>
        <FilterButtons>
          <FilterButton active={filter === '전체'} onClick={() => setFilter('전체')}>
            전체
          </FilterButton>
          <FilterButton active={filter === '충전'} onClick={() => setFilter('충전')}>
            충전
          </FilterButton>
          <FilterButton active={filter === '환불'} onClick={() => setFilter('환불')}>
            환불
          </FilterButton>
          <FilterButton active={filter === '사용'} onClick={() => setFilter('환불')}>
            사용
          </FilterButton>
          <FilterButton active={filter === '취소'} onClick={() => setFilter('취소')}>
            취소
          </FilterButton>
        </FilterButtons>
        {filteredData.length === 0 ? (
          <NoDataMessage>존재하는 캐시 내역이 없습니다.</NoDataMessage>
        ) : (
          filteredData.map((item, index) => (
            <ListItem
              key={index}
              type={item.amount > 0 ? 'positive' : 'negative'}
            >
              <span>{item.paymentDate}</span>
              <span>
                {item.amount > 0
                  ? `+ ${item.amount.toLocaleString()}원`
                  : `- ${Math.abs(item.amount).toLocaleString()}원`}
              </span>
            </ListItem>
          ))
        )}
      </Actbox>
    </Container>
  );
};

export default HistoryPage;
