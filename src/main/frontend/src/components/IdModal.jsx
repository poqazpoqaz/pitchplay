import Modal from "./Modal/Modal";
import { formattedDate } from "../utils/formattedDate";
import styled from "styled-components";
import Button from "../components/Button";


// Modal 내용 부분 스타일
const ModalContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 제목 스타일
const ModalTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--main-color);
`;

// 아이디와 가입날짜 정보를 감싸는 카드 스타일
const InfoCard = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

// 각 항목(아이디, 가입 날짜) 스타일
const InfoItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
`;

const Value = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
`;

function IdModal({ isOpen, closeModal, userState }) {
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <ModalContent>
                <ModalTitle>고객님의 아이디</ModalTitle>
                <InfoCard>
                    <InfoItem>
                        <Label>아이디:</Label>
                        <Value>{userState.id}</Value>
                    </InfoItem>
                    <InfoItem>
                        <Label>가입 날짜:</Label>
                        <Value>{formattedDate(userState.joinDate)}</Value>
                    </InfoItem>
                </InfoCard>
                <Button color="var(--main-color)" size="large" to="/login">로그인</Button>
                <Button color="var(--main-color)" size="large" to="/find/pw">비밀번호찾기</Button>
            </ModalContent>
        </Modal>
    );
}

export default IdModal;