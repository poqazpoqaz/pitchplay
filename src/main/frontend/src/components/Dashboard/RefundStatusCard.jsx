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


const RefundStatusCard = () => {
  const currentMonth = new Date().getMonth() + 1; // 현재 월
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth).padStart(2, '0'));
  const [refundData, setRefundData] = useState(null);
  const options = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; // 월 옵션

  useEffect(() => {
    axios
      .get("/data/refundData.json")
      .then((response) => {
        const data = response.data;
        if (data) {
          const filteredData = filterRefundDataByMonth(data, selectedMonth);
          setRefundData(filteredData);
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
      });
  }, [selectedMonth]);

  const filterRefundDataByMonth = (data, month) =>
    data.filter((item) => item.refundDate.split("-")[1] === month);

  const calculateRefundStats = () => {
    if (!refundData) return { cashRefund: 0, stadiumRefund: 0, cashCancel: 0, stadiumCancel: 0 };

    return refundData.reduce(
      (acc, curr) => {
        if (curr.refundtype === "캐쉬") {
          curr.refundStatus === "완료" ? acc.cashRefund++ : acc.cashCancel++;
        } else if (curr.refundtype === "구장") {
          curr.refundStatus === "완료" ? acc.stadiumRefund++ : acc.stadiumCancel++;
        }
        return acc;
      },
      { cashRefund: 0, stadiumRefund: 0, cashCancel: 0, stadiumCancel: 0 }
    );
  };

  const { cashRefund, stadiumRefund, cashCancel, stadiumCancel } = calculateRefundStats();

  return (
    <Wrapper>
      <Title>{selectedMonth}월 환불 현황</Title>
      <Dropdown
        options={options}
        selected={selectedMonth}
        onChange={setSelectedMonth}
        text="월 선택"
        gridArea="drop"
      />
      <FlexBox>
        <Text>캐쉬 환불 완료: {cashRefund} 건 </Text>
        <Text>구장 환불 완료: {stadiumRefund} 건 </Text>
        <Text>캐쉬 환불 취소: {cashCancel} 건 </Text>
        <Text>구장 환불 취소: {stadiumCancel} 건 </Text>
      </FlexBox>
    </Wrapper>
  );
};

export default RefundStatusCard;