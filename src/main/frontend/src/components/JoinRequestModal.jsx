import Modal from "./Modal/Modal";
import Button from "../components/Button";
import TitleText from "../components/TitleText";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledDiv = styled.div`
    margin: 20px 0px;

    p:first-child{
        margin-bottom: 10px;
    }
`;

function JoinRequestModal({ isOpen, closeModal, openAlarm}) {
    return (
        <Wrapper>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                    <TitleText size="large">가입신청</TitleText>
                </div>
                <StyledDiv>
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </StyledDiv>
                <Button color="var(--main-color)" size="large" onClick={openAlarm}>가입신청하기</Button>
            </Modal>
        </Wrapper>
    )
}

export default JoinRequestModal