import Modal from "../components/Modal/Modal";
import TitleText from "../components/TitleText";
import styled from "styled-components";
import Button from "./Button";
import Alarm from "../components/Alarm";
import { useState } from "react";


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


function MatchingPayment({ isOpen, closeModal, userCash, stadiumCost }) {
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);

    // 숫자를 포맷하는 함수
    const formatNumber = (number) =>
        Number(number).toLocaleString("en-US"); // en-US로 설정하여 천 단위 콤마 추가

    const remainingCash = +userCash - +stadiumCost;

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            {isAlarmOpen &&
                <Alarm 
                isOpen={isAlarmOpen}
                onClick={()=>setIsAlarmOpen(false)}
                closeAlarm={()=>setIsAlarmOpen(false)}
                to={'/team'}
                btntext={"확인"}
                >
                    결제되었습니다.
                </Alarm>}
            {(+userCash < +stadiumCost) ?
                <Wrapper>
                    <TitleWrapper>
                        <TitleText color="var(--main-color)">결제 신청</TitleText>
                        <p>피치캐시가 부족할 시 캐시 충전으로 이동합니다.</p>
                    </TitleWrapper>
                    <BoxWrapper>
                        <FlexDiv>
                            <p>부족한 캐시</p>
                            <p><span>{formatNumber(Math.abs(remainingCash))}</span> 원</p>
                        </FlexDiv>
                        <FlexDiv>
                            <p>현재 보유 캐시</p>
                            <p><span>{formatNumber(userCash)}</span> 원</p>
                        </FlexDiv>
                    </BoxWrapper>
                    <BoxWrapper>
                        <FlexDiv>
                            <p>결제 금액</p>
                            <p><span>{formatNumber(stadiumCost)}</span> 원</p>
                        </FlexDiv>
                    </BoxWrapper>
                    <Button color="var(--main-color)" size="large"> 충전하기</Button>
                </Wrapper>
                :
                <Wrapper>
                    <TitleWrapper>
                        <TitleText color="var(--main-color)">결제 신청</TitleText>
                        <p>피치캐시가 부족할 시 캐시 충전으로 이동합니다.</p>
                    </TitleWrapper>
                    <BoxWrapper>
                        <FlexDiv>
                            <p>결제 후 남는 캐시</p>
                            <p><span>{formatNumber(Math.abs(remainingCash))}</span> 원</p>
                        </FlexDiv>
                        <FlexDiv>
                            <p>현재 보유 캐시</p>
                            <p><span>{formatNumber(userCash)}</span> 원</p>
                        </FlexDiv>
                    </BoxWrapper>
                    <BoxWrapper>
                        <FlexDiv>
                            <p>결제 금액</p>
                            <p><span>{formatNumber(stadiumCost)}</span> 원</p>
                        </FlexDiv>
                    </BoxWrapper>
                    <Button color="var(--main-color)" size="large" onClick={() => setIsAlarmOpen(true)}> 신청하기 </Button>
                </Wrapper>
            }
        </Modal>

    )
}

export default MatchingPayment;