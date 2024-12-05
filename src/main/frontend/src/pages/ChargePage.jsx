import styled from 'styled-components';
import PriceButton from '../components/PriceButton/PriceButton';

// 메인 색을 변수로 설정
const mainColor = '#07550C';  // 클릭된 버튼의 배경색으로 설정

const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;  /* 최대 너비 설정 */
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  box-sizing: border-box;

  max-height: 100vh;  /* 화면의 최대 높이를 설정 */

  @media (max-width: 1024px) {
    padding: 15px;
    max-width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: #07550C;  /* 메인 색 적용 */
  font-size: 20px;
  font-weight: bold;
`;

const AmountContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 기본적으로 3열 */
  gap: 15px;
`;

const InfoText = styled.p`
  margin: 20px 0;
  font-size: 14px;
  color: #07550C;  /* 메인 색 적용 */
  text-align: right;  /* 오른쪽 정렬 */
`;

const PaymentSection = styled.div`
  margin-top: 20px;  /* PaymentSection과 상단 요소들 간의 간격 */
  flex-grow: 0;
`;

const PaymentButton = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #555;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #07550C;  /* 메인 색 적용 */
  }
`;

const TermsContainer = styled.div`
  text-align: left;
  margin-bottom: 70px;  /* TermsContainer와 그 아래 요소들 간의 간격 */
  font-size: 14px;
  color: #555;
`;

const TermItem = styled.li`
  display: flex;
  align-items: center;  /* 체크박스와 텍스트를 수평으로 배치 */
  margin-bottom: 10px;  /* li 간의 간격 추가 */
  
  input[type="checkbox"] {
    margin-right: 10px;  /* 체크박스와 텍스트 간의 간격 */
  }
`;

const PriceButtonStyled = styled(PriceButton)`
  background-color: ${(props) => props.isSelected ? mainColor : '#fff'};  /* 클릭된 버튼만 #07550C로 설정 */
  color: ${(props) => props.isSelected ? '#fff' : '#555'};  /* 클릭된 버튼은 흰색 글씨 */
  border: ${(props) => props.isSelected ? '1px solid #fff' : '1px solid #ddd'};  /* 클릭된 버튼은 흰색 테두리 */

  &:hover {
    background-color: ${(props) => !props.isSelected && '#f1f1f1'};  /* 선택되지 않은 버튼은 hover 시 배경색 변경 */
  }
`;

// 충전 신청 버튼 스타일을 따로 설정
const SubmitButton = styled(PriceButton)`
  background-color: ${mainColor};  /* 기본 배경색을 mainColor로 설정 */
  color: #fff;  /* 글씨 색은 흰색 */
  border: 1px solid #fff;  /* 테두리도 흰색 */
  
  &:hover {
    background-color: #064209;  /* hover 시 더 어두운 색으로 설정 */
  }

  /* 비활성화 상태 */
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const ChargePage = ({ 
  userCash = 0, 
  amounts = [], // 기본값 설정
  selectedAmount, 
  handleAmountClick, 
  paymentMethod, 
  handlePaymentMethodChange, 
  termsChecked, 
  handleTermsChange, 
  handleSubmit 
}) => { 
  return (
    <Container>
      <Title>캐시 충전</Title>

      <AmountContainer>
        {amounts.map((amount, index) => (
          <PriceButtonStyled 
            key={index} 
            onClick={() => handleAmountClick(amount)}
            size="medium"
            isSelected={selectedAmount === amount}  // 클릭된 금액에 배경색 적용
          >
            {amount}
          </PriceButtonStyled>
        ))}
      </AmountContainer>
      
      <InfoText>보유 캐시: {userCash} 캐시</InfoText>

      <PaymentSection>
        <Title>결제 방법</Title>
        <PaymentButton value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option>가상 계좌</option>
          <option>신용 카드</option>
          <option>카카오페이</option>
          <option>네이버페이</option>
        </PaymentButton>
        
        <TermsContainer>
          <ul>
            <TermItem>
              <input 
                type="checkbox" 
                name="serviceTerms" 
                checked={termsChecked.serviceTerms} 
                onChange={handleTermsChange}
              /> 서비스 이용약관
            </TermItem>
            <TermItem>
              <input 
                type="checkbox" 
                name="privacyTerms" 
                checked={termsChecked.privacyTerms} 
                onChange={handleTermsChange}
              /> 개인정보 수집 및 이용 동의
            </TermItem>
            <TermItem>
              <input
                type="checkbox"
                name="thirdPartyTerms"
                checked={termsChecked.thirdPartyTerms}
                onChange={handleTermsChange}
              /> 개인(신용정보) 제3자 제공 동의
            </TermItem>
          </ul>
        </TermsContainer>

        {/* 충전 신청 버튼 */}
        <SubmitButton 
          onClick={handleSubmit} 
          size="medium"
          disabled={selectedAmount === '' || !Object.values(termsChecked).every(Boolean)}  // 금액 및 약관 동의 확인
        >
          충전 신청
        </SubmitButton>
      </PaymentSection>
    </Container>
  );
};
export default ChargePage;