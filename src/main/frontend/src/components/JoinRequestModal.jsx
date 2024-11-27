import Modal from "./Modal/Modal";
import Button from "../components/Button";
import TitleText from "../components/TitleText";

function JoinRequestModal({isOpen, closeModal}) {
    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <TitleText>가입신청</TitleText>
                <p>가입 신청하면 원활한 소통을 위해 팀 운영진에게 프로필과 연락처가 제공됩니다.</p>
                <p>제 3자 개인정보에 동의하실 경우 아래 가입신청버튼을 눌러주세요.</p>
                <Button>가입신청하기</Button>
            </Modal>
        </div>
)
}

export default JoinRequestModal