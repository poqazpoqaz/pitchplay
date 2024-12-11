import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #ddd;

  & > div.amount {
    color: ${(props) =>
      props.type === "reservation" || props.type === "refund"
        ? "#ff0000"
        : "#1B4510"}; /* 리펀드 제이슨 데이터 및 환불은 빨간색, 충전은 초록색 */
  }
`;

// Component
const HistoryPage = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState("전체");
  const [paymentData, setPaymentData] = useState([]);
  const [refundData, setRefundData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentResponse = await fetch("/data/paymentData.json");
        const payment = await paymentResponse.json();

        const refundResponse = await fetch("/data/refundData.json");
        const refund = await refundResponse.json();

        const filteredPayment = payment.filter((item) => item.userId === id);
        const filteredRefund = refund.filter((item) => item.userId === id);

        const mergedData = [
          ...filteredPayment.map((paymentItem) => ({
            ...paymentItem,
            type: paymentItem.paymentStatus === "환불" ? "refund" : "charge",
          })),
          ...filteredRefund.map((refundItem) => ({
            orderId: refundItem.orderId,
            paymentDate: refundItem.paymentDate,
            refundDate: refundItem.refundDate,
            refundAmount: refundItem.refundAmount,
            refundStatus: refundItem.refundStatus,
            refundType: refundItem.refundtype,
            type: "reservation", // 예약 취소/완료 내역
          })),
        ];

        setPaymentData(filteredPayment);
        setRefundData(filteredRefund);
        setCombinedData(mergedData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [id]);

  const getFilteredData = () => {
    if (filter === "전체") return combinedData;
    if (filter === "충전")
      return combinedData.filter((item) => item.type === "charge");
    if (filter === "환불")
      return combinedData.filter((item) => item.type === "refund");
    if (filter === "예약")
      return combinedData.filter((item) => item.type === "reservation");
    return combinedData;
  };

  const filteredData = getFilteredData();

  return (
    <Container>
      <Header>
        <h2>결제 및 환불 내역</h2>
      </Header>
      <FilterButtons>
        <FilterButton
          active={filter === "전체"}
          onClick={() => setFilter("전체")}
        >
          전체
        </FilterButton>
        <FilterButton
          active={filter === "충전"}
          onClick={() => setFilter("충전")}
        >
          충전
        </FilterButton>
        <FilterButton
          active={filter === "환불"}
          onClick={() => setFilter("환불")}
        >
          환불
        </FilterButton>
        <FilterButton
          active={filter === "예약"}
          onClick={() => setFilter("예약")}
        >
          예약 상태
        </FilterButton>
      </FilterButtons>
      {filteredData.length === 0 ? (
        <NoDataMessage>데이터가 없습니다.</NoDataMessage>
      ) : (
        filteredData.map((item, index) => (
          <ListItem key={index} type={item.type}>
            <div>
              <strong>결제일:</strong> {item.paymentDate || "없음"}
            </div>
            {item.type === "reservation" ? (
              <>
                <div>
                  <strong>신청 일:</strong> {item.refundDate}
                </div>
                <div className="amount">
                  <strong>취소 금액:</strong>{" "}
                  {item.refundAmount.toLocaleString()}원
                </div>
                <div>
                  <strong>취소 상태:</strong> {item.refundStatus}
                </div>
                <div>
                  <strong> 유형:</strong> {item.refundType}
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>결제 상태:</strong> {item.paymentStatus}
                </div>
                <div className="amount">
                  <strong>금액:</strong>{" "}
                  {item.amount
                    ? `${item.amount.toLocaleString()}원`
                    : `${item.refundAmount.toLocaleString()}원`}
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
