import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding : 40px; 
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
const Actbox = styled.div `
width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`

const HistoryPage = ({ gridArea }) => {
  return (
    <Container style={{ gridArea: gridArea }}>
      <Actbox>
      <Header>
        <h2>캐시 상세 내역</h2>
      </Header>
      <FilterButtons>
        <FilterButton active>전체</FilterButton>
        <FilterButton>충전</FilterButton>
        <FilterButton>환불</FilterButton>
        <FilterButton>취소</FilterButton>
      </FilterButtons>
      <NoDataMessage>존재하는 캐시 내역이 없습니다.</NoDataMessage>
      <Divider />
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
        2024년 1월 1일 이전 내역은 <br />
        캐시 충전, 환불일 기준만 표시됩니다.
      </p>
      <Divider />
      <ListItem type="positive">
        <span>캐시 충전</span>
        <span>+ 20,000원</span>
      </ListItem>
      <ListItem type="negative">
        <span>캐시 환불</span>
        <span>- 10,000원</span>
      </ListItem>
      <ListItem type="positive">
        <span>캐시 충전</span>
        <span>+ 50,000원</span>
      </ListItem>
      <ListItem type="positive">
        <span>캐시 환불</span>
        <span>+ 30,000원</span>
      </ListItem>
      <ListItem type="negative">
        <span>캐시 취소</span>
        <span>- 20,000원</span>
      </ListItem>
      </Actbox>
    </Container>
  );
};

export default HistoryPage;
