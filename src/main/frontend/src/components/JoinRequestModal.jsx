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

function JoinRequestModal({ isOpen, closeModal, openAlarm, titletext, children, buttontext}) {
    return (
        <Wrapper>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                    <TitleText size="large">{titletext}</TitleText>
                </div>
                <StyledDiv>
                   {children}
                </StyledDiv>
                <Button color="var(--main-color)" size="large" onClick={openAlarm}>{buttontext}</Button>
            </Modal>
        </Wrapper>
    )
}

export default JoinRequestModal