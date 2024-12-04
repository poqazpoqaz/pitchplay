import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template: 
    "title drop" 50px
    "content content" 1fr / 3fr 1fr;
  border: 1px solid #A0A0A0;
  border-radius: 15px;
  padding: 20px;
  gap: 20px;
`;

const Title = styled.h1`
  grid-area: title;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;


const FlexBox = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.div`
  font-size: 1.2rem;
  padding: 10px;
  background: #F9F9F9;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
`;

const PaymentStatusCard = () => {
  const currentMonth = new Date().getMonth() + 1; // 현재 월
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth).padStart(2, '0'));
  const [paymentData, setPaymentData] = useState(null);
  const options = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; // 월 옵션

  // 데이터 불러오기
  useEffect(() => {
    axios.get('/data/paymentData.json') // 실제 데이터 경로로 변경
      .then(response => {
        const data = response.data;
        if (data) {
          const filteredData = filterDataByMonth(data, selectedMonth);
          setPaymentData(filteredData);
        }
      })
      .catch(error => console.error("데이터를 불러오는 데 실패했습니다.", error));
  }, [selectedMonth]); // selectedMonth가 변경될 때마다 데이터 재조회

  // 월에 해당하는 결제 데이터 필터링
  const filterDataByMonth = (data, month) => {
    return data.filter(item => item.paymentDate.split("-")[1] === month);
  };

  // 월 변경 시 처리 함수
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  // 결제 건수 계산
  const calculatePaymentStats = () => {
    if (!paymentData) return { cashPayment: 0, stadiumPayment: 0, cashCancel: 0, stadiumCancel: 0 };

    const stats = paymentData.reduce((acc, curr) => {
      if (curr.paymentMethod === "캐쉬") {
        if (curr.paymentStatus === "성공") {
          acc.cashPayment++;
        } else if (curr.paymentStatus === "취소") {
          acc.cashCancel++;
        }
      } else if (curr.paymentMethod === "구장") {
        if (curr.paymentStatus === "성공") {
          acc.stadiumPayment++;
        } else if (curr.paymentStatus === "취소") {
          acc.stadiumCancel++;
        }
      }
      return acc;
    }, { cashPayment: 0, stadiumPayment: 0, cashCancel: 0, stadiumCancel: 0 });

    return stats;
  };

  const { cashPayment, stadiumPayment, cashCancel, stadiumCancel } = calculatePaymentStats();

  return (
    <Wrapper>
      <Title>{selectedMonth}월 결제 현황</Title>
      <Dropdown
        options={options}
        selected={selectedMonth}
        onChange={handleMonthChange}
        text="월 선택"
        gridArea="drop"
      />
      <FlexBox>
        <Text>캐쉬 결제: {cashPayment} 건</Text>
        <Text>구장 결제: {stadiumPayment} 건</Text>
        <Text>캐쉬 결제 취소: {cashCancel} 건</Text>
        <Text>구장 결제 취소: {stadiumCancel} 건</Text>
      </FlexBox>
    </Wrapper>
  );
};

export default PaymentStatusCard;