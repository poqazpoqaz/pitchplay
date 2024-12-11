import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
  border: 1px solid ${(props) => (props.active ? "#1B4510" : "#ccc")};
  background-color: ${(props) => (props.active ? "#1B4510" : "#f5f5f5")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#16530c" : "#e0e0e0")};
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 40px 0;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  font-size: 14px;

  & > div.amount {
    color: ${(props) =>
      props.type === "reservation" || props.type === "refund" || props.type === "userHistory"
        ? "#ff0000"
        : "#1B4510"};
  }

  &.charge {
    display: ${(props) => (props.filter === "충전" || props.filter === "전체" ? "block" : "none")};
  }

  &.refund {
    display: ${(props) => (props.filter === "환불" || props.filter === "전체" ? "block" : "none")};
  }

  &.reservation {
    display: ${(props) => (props.filter === "예약" || props.filter === "전체" ? "block" : "none")};
  }

  &.userHistory {
    display: ${(props) => (props.filter === "userHistory" || props.filter === "전체" ? "block" : "none")};
  }
`;

const HistoryPage = () => {
  const [filter, setFilter] = useState("전체");
  const [paymentStore, setPaymentStore] = useState([]);
  const [userHistory, setUserHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentResponse, refundResponse] = await Promise.all([
          axios.get("/data/paymentData.json"),
          axios.get("/data/refundData.json"),
        ]);

        const paymentData = paymentResponse.data.filter((item) => item.userId === user.id);
        const refundData = refundResponse.data.filter((item) => item.userId === user.id);

        const mergedData = [
          ...paymentData.map((paymentItem) => ({
            ...paymentItem,
            type: paymentItem.paymentStatus === "환불" ? "refund" : "charge",
          })),
          ...refundData.map((refundItem) => ({
            orderId: refundItem.orderId,
            paymentDate: refundItem.paymentDate,
            refundDate: refundItem.refundDate,
            refundAmount: refundItem.refundAmount,
            refundStatus: refundItem.refundStatus,
            refundType: refundItem.refundtype,
            type: "reservation",
          })),
        ];

        setPaymentStore(mergedData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [user.id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const normalizedHistory = user.userHistory.map((item) => ({
        ...item,
        category: item.category || item.Category,
      }));
      setUserHistory(normalizedHistory);
    }
  }, []);

  const handleUserHistoryClick = () => {
    setFilter("userHistory");
  };

  const combinedData = paymentStore.concat(
    userHistory.map((item) => ({
      ...item,
      type: "userHistory", // 명시적으로 userHistory 타입 추가
    }))
  );

  return (
    <Container>
      <Header>
        <h2>결제 및 환불 내역</h2>
      </Header>
      <FilterButtons>
        <FilterButton active={filter === "전체"} onClick={() => setFilter("전체")}>
          전체
        </FilterButton>
        <FilterButton active={filter === "userHistory"} onClick={handleUserHistoryClick}>
          내 기록
        </FilterButton>
        <FilterButton active={filter === "충전"} onClick={() => setFilter("충전")}>
          충전
        </FilterButton>
        <FilterButton active={filter === "환불"} onClick={() => setFilter("환불")}>
          환불
        </FilterButton>
        <FilterButton active={filter === "예약"} onClick={() => setFilter("예약")}>
          예약 상태
        </FilterButton>
      </FilterButtons>
      {combinedData.length === 0 ? (
        <NoDataMessage>데이터가 없습니다.</NoDataMessage>
      ) : (
        combinedData.map((item, index) => (
          <ListItem
            key={index}
            type={item.type}
            filter={filter}
            className={item.type}
          >
            {item.type !== "userHistory" && (
              <div>
                <strong>결제일:</strong> {item.paymentDate || "없음"}
              </div>
            )}
            {item.type === "reservation" ? (
              <>
                <div>
                  <strong>신청 일:</strong> {item.refundDate}
                </div>
                <div className="amount">
                  <strong>취소 금액:</strong> {item.refundAmount ? item.refundAmount.toLocaleString() : "없음"}캐시
                </div>
                <div>
                  <strong>취소 상태:</strong> {item.refundStatus || "없음"}
                </div>
                <div>
                  <strong>유형:</strong> {item.refundType || "없음"}
                </div>
              </>
            ) : item.type === "userHistory" ? (
              <>
                <div>
                  <strong>사용 일:</strong> {item.useDate}
                </div>
                <div>
                  <strong>카테고리:</strong> {item.category}
                </div>
                <div className="amount">
                  <strong>사용 금액:</strong> {item.useHistory ? item.useHistory.toLocaleString() : "0"}캐시
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>결제 상태:</strong> {item.paymentStatus || "없음"}
                </div>
                <div className="amount">
                  <strong>금액:</strong> {item.amount ? item.amount.toLocaleString() : "없음"}캐시
                </div>
              </>
            )}
          </ListItem>
        ))
      )}
    </Container>
  );
};

export default HistoryPage;
