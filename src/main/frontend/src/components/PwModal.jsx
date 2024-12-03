import styled from "styled-components"
import Modal from "../components/Modal/Modal";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

const ModalContent = styled.div`
    text-align: center;
`;

const Message = styled.p`
    color: ${(props) => (props.children === "비밀번호가 성공적으로 변경되었습니다." ? "green" : "red")};
`;


function PwModal({ isOpen, closeModal, userActions, setConfirmedPassword, message, userState, confirmedPassword, handleSubmit }) {
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <ModalContent>
                <h3>새로운 비밀번호를 입력해주세요.</h3>
                <LabelInput
                    id="newPassword"
                    type="password"
                    placeholder="새 비밀번호를 입력하세요"
                    value={userState.password}
                    onChange={(e) => userActions.changePassword(e.target.value)} // 새로운 비밀번호 입력
                />
                <LabelInput
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)} // 비밀번호 확인 입력
                />
                <Message>{message}</Message>
                <Button onClick={handleSubmit} color="var(--main-color)" size="large">비밀번호 변경</Button>
            </ModalContent>
        </Modal>
    );
}

export default PwModal;