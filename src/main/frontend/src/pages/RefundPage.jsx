import React from 'react';
import styled from 'styled-components';
import PriceButton from '../components/PriceButton/PriceButton';

// 메인 색을 변수로 설정
const mainColor = '#07550C';

const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  max-height: 90vh;

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

const RefundPage = ({
  userCash,
  account,
  accountNum,
  name,
  refundAmount,
  isAgreed,
  error,
  handleAccountNumberChange,
  handleAccountHolderChange,
  handleRefundAmountChange,
  handleCheckboxChange,
  handleSubmit,
}) => {
  return (
    <Container>
      <Title>환불 신청</Title>
      <SubInfoText>포인트를 제외한 캐시만 환불됩니다.</SubInfoText>

      <BorderLine />
      <InfoText>보유 캐시: {userCash} 캐시</InfoText>
      <RedText1>만원 단위로만 환불 가능합니다.</RedText1>

      <Input
        type="text"
        placeholder="환불 은행"
        value={account}
        onChange={handleAccountNumberChange}
      />

      <Input
        type="text"
        placeholder="환불 계좌 번호"
        value={accountNum}
        onChange={handleAccountNumberChange}
      />

      <Input
        type="text"
        placeholder="예금주"
        value={name}
        onChange={handleAccountHolderChange}
      />

      <Input
        type="number"
        placeholder="환불 금액"
        value={refundAmount}
        onChange={handleRefundAmountChange}
      />

      <CheckboxWrapper>
        <Checkbox type="checkbox" checked={isAgreed} onChange={handleCheckboxChange} />
        <CheckboxText>
          캐시환불은 매주 월/금요일 18시부터 순차적으로 처리됩니다.
        </CheckboxText>
      </CheckboxWrapper>

      {error && <RedText2>{error}</RedText2>}

      <SubmitButton
        size="medium"
        disabled={!isAgreed || !refundAmount || !accountNum}
        onClick={handleSubmit}
      >
        환불 신청
      </SubmitButton>
    </Container>
  );
};

export default RefundPage;
