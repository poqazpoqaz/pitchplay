import Modal from "../components/Modal/Modal";
import TitleText from "../components/TitleText";
import styled from "styled-components";
import Button from "./Button";

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
    
`

function MatchingPayment({ isOpen, closeModal, userCash, stadiumCost }) {
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <TitleWrapper>
                <TitleText color="var(--main-color)">결제 신청</TitleText>
                <p>피치캐시가 부족할 시 캐시 충전으로 이동합니다.</p>
            </TitleWrapper>
            <BoxWrapper>
                <h3>피치캐시</h3>
                <p>결제 후 남은 캐시 : </p>
                <p>현재 보유 캐시 : {userCash}</p>
            </BoxWrapper>
            <BoxWrapper>
                <p>결제 금액: {stadiumCost}</p>
            </BoxWrapper>
            {+userCash < +stadiumCost ?
                <Button color="var(--main-color)" size="large"> 충전하기</Button>
                :
                <Button color="var(--main-color)" size="large"> 결제하기</Button>
            }
        </Modal>
    )
}

export default MatchingPayment;