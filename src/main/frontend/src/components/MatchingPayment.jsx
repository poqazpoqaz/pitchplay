import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import TitleText from "../components/TitleText";
import styled from "styled-components";
import Button from "./Button";
import Alarm from "../components/Alarm";
import {formatCurrency} from "../utils/formattedDate";

const Wrapper = styled.div`
  span {
    font-weight: bold;
    font-size: 1.8rem;
  }
`;

const TitleWrapper = styled.div`
  p {
    color: #a0a0a0;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const BoxWrapper = styled.div`
  background-color: #e4f5e5;
  margin: 20px;
  padding: 10px;
  border-radius: 15px;

  h3 {
    margin-bottom: 10px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MatchingPayment({ to, isOpen, closeModal, userCash, stadiumCost, divisor = 1 }) {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [currentCash, setCurrentCash] = useState(userCash); // 현재 캐시 상태

  // `stadiumCost`를 `divisor`로 나눈 값 계산
  const adjustedStadiumCost = Math.round(stadiumCost / divisor / 100) * 100;

  const handlePayment = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const userHistory = user.userHistory || [];

    if (currentCash >= adjustedStadiumCost) {
      const updatedCash = currentCash - adjustedStadiumCost;
      setCurrentCash(updatedCash);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      const updatedHistory = [
        ...userHistory,
        { category: "matching", useHistory: adjustedStadiumCost, useDate: formattedDate },
      ];
      const updatedUser = { ...user, userCash: updatedCash, userHistory: updatedHistory };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsAlarmOpen(true);
    } else {
      alert("캐시가 부족합니다. 충전이 필요합니다.");
    }
  };

  const remainingCash = currentCash - adjustedStadiumCost;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {isAlarmOpen && (
        <Alarm
          isOpen={isAlarmOpen}
          onClick={() => setIsAlarmOpen(false)}
          closeAlarm={() => setIsAlarmOpen(false)}
          to={to}
          btntext={"확인"}
        >
          결제되었습니다.
        </Alarm>
      )}
      {currentCash < adjustedStadiumCost ? (
        <Wrapper>
          <TitleWrapper>
            <TitleText color="var(--main-color)">결제 신청</TitleText>
            <p>피치캐시가 부족할 시 캐시 충전으로 이동합니다.</p>
          </TitleWrapper>
          <BoxWrapper>
            <FlexDiv>
              <p>부족한 캐시</p>
              <p>
                <span>{formatCurrency(Math.abs(remainingCash))}</span> 캐시
              </p>
            </FlexDiv>
            <FlexDiv>
              <p>현재 보유 캐시</p>
              <p>
                <span>{formatCurrency(currentCash)}</span> 캐시
              </p>
            </FlexDiv>
          </BoxWrapper>
          <BoxWrapper>
            <FlexDiv>
              <p>결제 금액</p>
              <p>
                <span>{formatCurrency(adjustedStadiumCost)}</span> 캐시
              </p>
            </FlexDiv>
          </BoxWrapper>
          <Button color="var(--main-color)" size="large">
            충전하기
          </Button>
        </Wrapper>
      ) : (
        <Wrapper>
          <TitleWrapper>
            <TitleText color="var(--main-color)">결제 신청</TitleText>
            <p>피치캐시가 부족할 시 캐시 충전으로 이동합니다.</p>
          </TitleWrapper>
          <BoxWrapper>
            <FlexDiv>
              <p>결제 후 남는 캐시</p>
              <p>
                <span>{formatCurrency(remainingCash)}</span> 캐시
              </p>
            </FlexDiv>
            <FlexDiv>
              <p>현재 보유 캐시</p>
              <p>
                <span>{formatCurrency(userCash)}</span> 캐시
              </p>
            </FlexDiv>
          </BoxWrapper>
          <BoxWrapper>
            <FlexDiv>
              <p>결제 금액</p>
              <p>
                <span>{formatCurrency(adjustedStadiumCost)}</span> 캐시
              </p>
            </FlexDiv>
          </BoxWrapper>
          <Button
            color="var(--main-color)"
            size="large"
            onClick={handlePayment}
          >
            신청하기
          </Button>
        </Wrapper>
      )}
    </Modal>
  );
}

export default MatchingPayment;
