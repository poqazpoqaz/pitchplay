import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const AmountContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열로 버튼 배치 */
  gap: 15px; /* 버튼 간격 */
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  margin: 20px 0;
  font-size: 14px;
  color: #555;
`;

const PaymentSection = styled.div`
  margin-top: 20px;
`;

const PaymentButton = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #555;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #28a745;
  }
`;

const TermsContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
`;

const ChargePage = ({ gridArea, usercash }) => {
  const amounts = [
    '3,000원', '5,000원', '8,000원', '10,000원', '15,000원', 
    '20,000원', '30,000원', '40,000원', '50,000원'
  ];

  // 금액 버튼 클릭 시 처리할 함수
  const handleAmountClick = (amount) => {
    console.log(`${amount}을(를) 선택하였습니다.`);
  };

  // 충전 신청 버튼 클릭 시 처리할 함수
  const handleSubmit = () => {
    console.log("충전 신청을 하였습니다.");
  };

  return (
    <Container style={{ gridArea: gridArea }}>
      <Title>캐시 충전</Title>

      {/* AmountButton들을 AmountContainer로 감싸서 그리드로 배치 */}
      <AmountContainer>
        {amounts.map((amount, index) => (
          <Button 
            key={index} 
            color="#28a745" 
            onClick={() => handleAmountClick(amount)}
          >
            {amount}
          </Button>
        ))}
      </AmountContainer>

      <InfoText>보유 캐시: {usercash} 캐시</InfoText>

      <PaymentSection>
        <h3>결제 방법</h3>
        <PaymentButton>
          <option>가상 계좌</option>
        </PaymentButton>
        <TermsContainer>
          <ul>
            <li>서비스 이용약관</li>
            <li>개인정보 수집 및 이용 동의</li>
            <li>개인(신용정보) 제3자 제공 동의</li>
          </ul>
        </TermsContainer>

        {/* SubmitButton은 Submit 버튼으로 변경 */}
        <Button color="#28a745" onClick={handleSubmit} size="medium">충전 신청</Button>
      </PaymentSection>
    </Container>
  );
};

export default ChargePage;
