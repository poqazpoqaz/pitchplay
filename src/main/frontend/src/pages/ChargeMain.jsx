import React, { useState, useEffect } from 'react';
import ChargePage from './ChargePage';

const ChargeMain = ({ gridArea }) => {
  const [userCash, setUsercash] = useState(0);  // 유저의 캐시 상태
  const [selectedAmount, setSelectedAmount] = useState('');  // 선택된 금액
  const [paymentMethod, setPaymentMethod] = useState('가상 계좌');  // 결제 방법 상태
  const [termsChecked, setTermsChecked] = useState({
    serviceTerms: false,
    privacyTerms: false,
    thirdPartyTerms: false,
  });  // 체크박스 상태 관리

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));  // localStorage에서 'user' 가져오기
    if (user && user.userCash) {
      setUsercash(user.userCash);  // 유저의 캐시를 상태에 저장
    }
  }, []);

  const amounts = [
    '3,000원', '5,000원', '8,000원', '10,000원', '15,000원', 
    '20,000원', '30,000원', '40,000원', '50,000원'
  ];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);  // 선택한 금액을 상태로 저장
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);  // 결제 방법 변경
  };

  const handleTermsChange = (event) => {
    const { name, checked } = event.target;
    setTermsChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    if (selectedAmount === '') {
      alert('금액을 선택해주세요.');
      return;
    }
  
    const allChecked = Object.values(termsChecked).every(value => value === true);
    if (!allChecked) {
      alert('모든 약관에 동의해야 합니다.');
      return;
    }
  
    const amount = parseInt(selectedAmount.replace(/,/g, '').replace('원', ''), 10);
    const updatedCash = Number(userCash) + amount;
  
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const updatedUser = { ...user, userCash: updatedCash };
  
    // 로컬 스토리지 업데이트
    localStorage.setItem('user', JSON.stringify(updatedUser));
  
    // React 상태 즉시 업데이트
    setUsercash(updatedCash);
  
    alert('충전 신청을 완료했습니다!');
    alert(`충전 금액: ${selectedAmount}\n총 보유 캐시: ${updatedCash}원`);
  };

  return (
    <div style={{ gridArea }}>
 <ChargePage
    userCash={userCash}
    amounts={amounts} // 여기에서 amounts가 전달되어야 합니다.
    selectedAmount={selectedAmount}
    handleAmountClick={handleAmountClick}
    paymentMethod={paymentMethod}
    handlePaymentMethodChange={handlePaymentMethodChange}
    termsChecked={termsChecked}
    handleTermsChange={handleTermsChange}
    handleSubmit={handleSubmit}
/>
    </div>
  );
};

export default ChargeMain;
