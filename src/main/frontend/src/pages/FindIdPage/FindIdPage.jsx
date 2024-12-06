import { Link } from "react-router-dom";
import FoundItems from "../../components/FoundItems";
import Button from "../../components/Button";
import styles from "./FindIdPage.module.css";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useEffect, useState } from "react";
import Alarm from "../../components/Alarm";
import axios from "axios";
import IdModal from "../../components/IdModal";
import { generateAuthCode } from "../../utils/authCode";



const ChangeSetting = () => {
  const { state: userState, actions: userActions } = UserStore();
  const [authCode, setAuthCode] = useState(""); // 인증 코드 상태
  const [newEmail, setNewEmail] = useState(userState.email); // 새 이메일 상태
  const [emailChangeModal, setEmailChangeModal] = useState(false); // 이메일 변경 모달 상태
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 변경 모달 상태
  const [confirmedPassword, setConfirmedPassword] = useState(""); // 비밀번호 확인 상태
  const [message, setMessage] = useState(""); // 메시지 상태
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // 이메일 인증 모달 열기 상태

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true); // 비밀번호 변경 모달 오픈
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false); // 비밀번호 변경 모달 닫기
  };

  const openEmailModal = () => {
    setIsEmailModalOpen(true); // 이메일 인증 모달 오픈
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false); // 이메일 인증 모달 닫기
  };

  const setPhone = (phone) => {
    userActions.changePhone(phone); // 전화번호 업데이트
  };

  const setBirth = (birth) => {
    userActions.changeBirthday(birth); // 생년월일 업데이트
  };

  const setAccountName = (accountName) => {
    userActions.changeAccountName(accountName); // 계좌명 업데이트
  };

  const setAccountNumber = (accountNumber) => {
    userActions.changeAccountNum(accountNumber); // 계좌번호 업데이트
  };

  const sendAuthCode = () => {
    const code = generateAuthCode();
    localStorage.setItem('authCode', code); // 인증번호 로컬 스토리지에 저장
    alert("인증번호가 발송되었습니다.");
    openEmailModal(); // 인증번호 발송 후 이메일 인증 모달 열기
  };

  const verifyAuthCode = () => {
    const storedCode = localStorage.getItem("authCode"); // 저장된 인증번호
    if (storedCode === authCode) {
      alert('인증 완료');
      closeEmailModal(); // 인증 완료 후 모달 닫기
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = () => {
    if (userState.password === confirmedPassword) {
      userActions.changePassword(confirmedPassword); // 비밀번호 변경
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
      closePasswordModal(); // 모달 닫기
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div>
      <ChangeSetComp
        userState={userState}
        userActions={userActions}
        openPasswordModal={openPasswordModal}
        setPhone={setPhone}
        setBirth={setBirth}
        setAccountName={setAccountName}
        setAccountNumber={setAccountNumber}
        sendAuthCode={sendAuthCode}
        verifyAuthCode={verifyAuthCode}
        authCode={authCode}
        setAuthCode={setAuthCode}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        emailChangeModal={emailChangeModal}
        openEmailChangeModal={() => setEmailChangeModal(true)}
        closeEmailChangeModal={() => setEmailChangeModal(false)}
        handleSubmit={handleSubmit}
      />

      {/* 비밀번호 변경 모달 */}
      <PwModal
        isOpen={isPasswordModalOpen}
        closeModal={closePasswordModal}
        userActions={userActions}
        setConfirmedPassword={setConfirmedPassword}
        message={message}
        userState={userState}
        confirmedPassword={confirmedPassword}
        handleSubmit={handleSubmit}
      />

      {/* 이메일 인증 모달 */}
      <Modal
        isOpen={isEmailModalOpen} // 이메일 인증 모달 상태 체크
        closeModal={closeEmailModal} // 모달 닫기 함수
      >
        <h3>이메일 인증</h3>
        <input 
          type="text" 
          value={authCode} 
          onChange={(e) => setAuthCode(e.target.value)} 
          placeholder="인증번호 입력"
        />
        <button onClick={verifyAuthCode}>인증하기</button>
      </Modal>
    </div>
  );
};

export default ChangeSetting;
