import Modal from "../components/Modal/Modal";
import TitleText from "../components/TitleText";
import styled from "styled-components";
import Button from "./Button";
import Alarm from "../components/Alarm";
import { useState } from "react";
import {formatCurrency} from "../utils/formattedDate";
import Category from "./Category/Category";


// 추후에 결제하는 쪽 주소 보내야함
// 추후에 결제되는 형식으로 시행되어야 함

const Wrapper = styled.div`
    span{
        font-weight: bold;
        font-size: 1.8rem;
    }
`;

const TitleWrapper = styled.div`
    p {
        color: #A0A0A0;
        font-size: 1rem;
        font-weight: bold;
    }
`;

const BoxWrapper = styled.div`
    background-color: #E4F5E5;
    margin: 20px;
    padding: 10px;
    border-radius: 15px;
    
    h3{
    margin-bottom: 10px;
    }
`

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`


function MatchingPayment({ to, isOpen, closeModal, userCash, stadiumCost }) {
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [currentCash, setCurrentCash] = useState(userCash); // 현재 캐시 상태



    const handlePayment = () => {
        // 로컬스토리지에서 user 객체 가져오기
        const user = JSON.parse(localStorage.getItem("user")) || {};
        
        // userHistory가 없으면 빈 배열로 초기화
        const userHistory = user.userHistory || [];
    
        if (currentCash >= stadiumCost) {
            const updatedCash = currentCash - stadiumCost; // 남은 캐시 계산
            setCurrentCash(updatedCash); // UI 상태 업데이트
    
            // 결제 기록 추가
            const updatedHistory = [...userHistory, { category: "matching", useHistory: stadiumCost }];
            const updatedUser = { ...user, userCash: updatedCash, userHistory: updatedHistory }; // userCash 업데이트
    
            // 로컬스토리지에 변경된 user 저장
            localStorage.setItem("user", JSON.stringify(updatedUser));
    
            setIsAlarmOpen(true); // 알람 표시
        } else {
            alert("캐시가 부족합니다. 충전이 필요합니다."); // 캐시 부족 알림
        }
    };

    const remainingCash = currentCash - stadiumCost; // 결제 후 남는 캐시 계산

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
            {currentCash < stadiumCost ? (
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
                                <span>{formatCurrency(stadiumCost)}</span> 캐시
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
                                <span>{formatCurrency(stadiumCost)}</span> 캐시
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