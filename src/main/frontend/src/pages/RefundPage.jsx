import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PriceButton from '../components/PriceButton/PriceButton';

const mainColor = '#07550C';  // mainColor 변수 추가

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
  box-sizing: border-box;
  height: 100%;  /* Container의 높이를 꽉 채우도록 설정 */
  max-height: 90vh;  /* 화면 높이의 90%로 제한 */

  @media (max-width: 1024px) {
    padding: 15px;
    max-width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

const Title = styled.h1`
  color: #07550C;
  font-size: 20px;
  font-weight: bold;
`;

const SubInfoText = styled.p`
  font-size: 14px;
  color: red;
  text-align: center;
`;

const InfoText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #07550C;
  text-align: right;
`;

const RedText1 = styled.p`
  color: red;
  font-size: 12px;
  text-align: right;
  margin-bottom: 20px;
`;

const RedText2 = styled.p`
  color: red;
  font-size: 10px;
  text-align: left;
  margin-top: 10px;
`;

const SubmitButton = styled(PriceButton)`
  background-color: ${mainColor};  
  color: #fff;
  border: 1px solid #fff;
  margin-top: 20px; 
  
  &:hover {
    background-color: #064209;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const BorderLine = styled.hr`
  margin: 30px 0;
  border: 1px solid #ddd;
`;

const Dropdown = styled.select`
  padding: 10px;
  margin: 30px 0 20px 0; 
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 10px;
  margin: 20px 0; 
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; 
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxText = styled.p`
  font-size: 12px;
  color: #07550C;
  text-align: left;
`;

const ChargePage = ({ gridArea }) => {
  const [userCash, setUsercash] = useState(0);  
  const [selectedBank, setSelectedBank] = useState('');  
  const [accountNumber, setAccountNumber] = useState('');  
  const [accountHolder, setAccountHolder] = useState('');  
  const [refundAmount, setRefundAmount] = useState('');  
  const [isAgreed, setIsAgreed] = useState(false);  
  const [error, setError] = useState('');  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userCash) {
      setUsercash(user.userCash);  
    }
  }, []);

  const handleBankChange = (e) => setSelectedBank(e.target.value);
  const handleAccountNumberChange = (e) => setAccountNumber(e.target.value);
  const handleAccountHolderChange = (e) => setAccountHolder(e.target.value);

  // 환불 금액을 처리하는 함수 (문자 제거)
  const handleRefundAmountChange = (e) => {
    const sanitizedAmount = e.target.value.replace(/[^\d]/g, ''); // 숫자가 아닌 모든 문자를 제거하는 정규 표현식
    setRefundAmount(sanitizedAmount);
  };
  
  const handleCheckboxChange = () => setIsAgreed(!isAgreed);  

  // 유효성 검사
  const validateForm = () => {
    const refund = Number(refundAmount);  // 문자열을 숫자로 변환

    // 1. 환불 금액이 보유 캐시를 초과하는지 확인
    if (refund > userCash) {
      setError('환불 금액은 보유 캐시를 초과할 수 없습니다.');
      return false;
    }

    // 2. 환불 금액이 만 원 단위인지 확인
    if (refundAmount && refund % 10000 !== 0) {  
      setError('환불 금액은 만원 단위로만 입력 가능합니다.');
      return false;
    }

    // 3. 계좌번호 유효성 검사
    if (!/^\d{10,20}$/.test(accountNumber)) {
      setError('유효한 계좌번호를 입력해주세요.');
      return false;
    }

    // 4. 동의 여부 확인
    if (!isAgreed) {
      setError('환불 신청을 위해서는 동의해야 합니다.');
      return false;
    }

    setError('');  // 모든 검증이 통과하면 에러 메시지를 초기화
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('환불 신청이 완료되었습니다.');
    }
  };

  return (
    <Container style={{ gridArea: gridArea }}>
      <Title>환불 신청</Title>
      <SubInfoText>포인트를 제외한 캐시만 환불됩니다.</SubInfoText>

      <BorderLine />
      <InfoText>보유 캐시: {userCash} 캐시</InfoText>
      <RedText1>만원 단위로만 환불 가능합니다.</RedText1>

      <Dropdown value={selectedBank} onChange={handleBankChange}>
        <option value="">은행을 선택하세요</option>
        <option value="kakao">카카오뱅크</option>
        <option value="shinhan">신한은행</option>
        <option value="kb">KB국민은행</option>
        <option value="nh">NH농협은행</option>
        <option value="woori">우리은행</option>
      </Dropdown>

      <Input
        type="text"
        placeholder="환불 계좌 번호"
        value={accountNumber}
        onChange={handleAccountNumberChange}
      />
      
      <Input
        type="text"
        placeholder="예금주"
        value={accountHolder}
        onChange={handleAccountHolderChange}
      />

      <Input
        type="number"
        placeholder="환불 금액"
        value={refundAmount}
        onChange={handleRefundAmountChange}
      />

      <CheckboxWrapper>
        <Checkbox 
          type="checkbox" 
          checked={isAgreed} 
          onChange={handleCheckboxChange}
        />
        <CheckboxText>
          캐시환불은 매주 월/금요일 18시부터 순차적으로 처리됩니다.
        </CheckboxText>
      </CheckboxWrapper>

      {error && <RedText2>{error}</RedText2>}

      <SubmitButton size="medium" disabled={!isAgreed || !refundAmount || !accountNumber} onClick={handleSubmit}> 
        환불 신청
      </SubmitButton>
    </Container>
  );
};

export default ChargePage;
