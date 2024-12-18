import React, { useEffect, useState } from 'react';
import ChangeSetComp from './ChangeSetComp';
import Modal from '../../../components/Modal/Modal'; // Modal 컴포넌트 import
import { useStore as UserStore } from "../../../stores/UserStore/useStore";
import { generateAuthCode } from '../../../utils/authCode'; // 인증 코드 생성 유틸
import Alarm from "../../../components/Alarm";
import styles from "./ChangeSetting.module.css";

const ChangeSetting = ({ gridArea }) => {
    const { state: userState, actions: userActions } = UserStore();
    const [authCode, setAuthCode] = useState(""); // 인증 코드 상태
    const [newEmail, setNewEmail] = useState(""); // 새 이메일 상태
    const [newPhone, setNewphone] = useState("");
    const [newbirth, setNewBirth] = useState("");
    const [newAccount, setNewAccount] = useState("");
    const [newAccountNum, setNewAccountNum] = useState("");
    const [newPassword, setNewPassword] = useState(""); // 비밀번호 상태
    const [emailChangeModal, setEmailChangeModal] = useState(false); // 이메일 변경 모달 상태
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 변경 모달 상태
    const [message, setMessage] = useState('이름과 이메일을 작성해주세요.');
    const [isAlarmOpen, setIsAlarmOpen] = useState(false); // 알람창 상태

    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };


    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        userActions.updateAllFields(user);
    }, []);

    useEffect(() => {
        if(userState){
            setNewBirth(userState.birthday);
            setNewphone(userState.phone);
            setNewAccount(userState.account);
            setNewAccountNum(userState.accountNum);
        }
    },[userState])

    const sendAuthCode = () => {
        const code = generateAuthCode();
        localStorage.setItem('authCode', code); // 인증번호 로컬 스토리지에 저장
        setMessage("인증번호가 발송되었습니다.");
        setIsAlarmOpen(true);
    };

    const verifyAuthCode = () => {
        const storedCode = localStorage.getItem("authCode"); // 저장된 인증번호
        if (storedCode === authCode) {
            alert('인증 완료');
            setEmailChangeModal(true); // 인증 완료 후 이메일 변경 모달 열기
        } else {
            alert('인증번호가 일치하지 않습니다.');
            setIsAlarmOpen(true);
        }
    };

    const handleSubmit = () => {
        userActions.changePassword(newPassword); // 비밀번호 변경
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
        setIsAlarmOpen(true);
        closePasswordModal(); // 모달 닫기
        const updatedUserPW = { ...user, password: newPassword };
        localStorage.setItem("user", JSON.stringify(updatedUserPW));
    };

    const handleEmailChange = () => {
        userActions.changeEmail(newEmail);
        setMessage('이메일이 변경되었습니다.');
        setIsAlarmOpen(true);
        setEmailChangeModal(false); // 이메일 변경 후 모달 닫기
        const updatedUseremail = { ...user, email: newEmail };
        localStorage.setItem("user", JSON.stringify(updatedUseremail));
    };

    const handleSubmitInfo = () => {
        // 1. 변경된 값들을 userState에 반영
        if (newPhone) {
            userActions.changePhone(newPhone); // 전화번호 변경
        } else {
            userActions.changePhone(userState.phone); // 변경되지 않으면 기존 값 사용
        }
    
        if (newbirth) {
            userActions.changeBirthday(newbirth); // 생년월일 변경
        } else {
            userActions.changeBirthday(userState.birthday); // 변경되지 않으면 기존 값 사용
        }
    
        if (newAccount) {
            userActions.changeAccountName(newAccount); // 계좌명 변경
        } else {
            userActions.changeAccountName(userState.account); // 변경되지 않으면 기존 값 사용
        }
    
        if (newAccountNum) {
            userActions.changeAccountNum(newAccountNum); // 계좌번호 변경
        } else {
            userActions.changeAccountNum(userState.accountNum); // 변경되지 않으면 기존 값 사용
        }
    
        // 2. 로컬 스토리지에 반영
        const updatedUserInfo = {
            ...user, // 기존의 사용자 정보
            phone: newPhone, // 변경된 전화번호 또는 기존 전화번호
            birthday: newbirth, // 변경된 생년월일 또는 기존 생년월일
            account: newAccount, // 변경된 계좌명 또는 기존 계좌명
            accountNum: newAccountNum // 변경된 계좌번호 또는 기존 계좌번호
        };
    
        // 3. 로컬 스토리지에 저장
        localStorage.setItem("user", JSON.stringify(updatedUserInfo));
    
        // 4. 알림 처리
        setMessage('정보가 성공적으로 변경되었습니다.');
        setIsAlarmOpen(true);
    };
    
    
    return (
        <div style={{ gridArea }}>
            <div className={styles.content}>
                <div className={styles.actbox}>
                    <ChangeSetComp
                        userState={userState}
                        userActions={userActions}
                        openPasswordModal={openPasswordModal}
                        //핸드폰
                        newPhone = {newPhone}
                        setNewPhone={setNewphone}
                        // 생년월일
                        newbirth = {newbirth}
                        setNewBirth={setNewBirth}
                        //계좌
                        newAccount ={newAccount}
                        newAccountNum ={newAccountNum}
                        setNewAccount={setNewAccount}
                        setNewAccountNum={setNewAccountNum}

                        sendAuthCode={sendAuthCode}
                        verifyAuthCode={verifyAuthCode}
                        authCode={authCode}
                        setAuthCode={setAuthCode}
                        setNewPassword={setNewPassword}
                        newPassword={newPassword}
                        newEmail={newEmail}
  
                        setNewEmail={setNewEmail}
                        emailChangeModal={emailChangeModal}
                        openEmailChangeModal={() => setEmailChangeModal(true)}
                        closeEmailChangeModal={() => setEmailChangeModal(false)}
                        handleSubmitInfo={handleSubmitInfo}
                        setMessage={setMessage}
                        setIsAlarmOpen={setIsAlarmOpen}
      

                    />

                    {/* 비밀번호 변경 모달 */}
                    <Modal
                        isOpen={isPasswordModalOpen} // 비밀번호 변경 모달 상태 체크
                        closeModal={closePasswordModal} // 비밀번호 변경 모달 닫기
                    >
                        <h2>비밀번호 변경</h2>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} // 비밀번호 입력
                            placeholder="새 비밀번호 입력"
                        />
                        <button onClick={handleSubmit}>비밀번호 변경</button>
                        <button onClick={closePasswordModal}>닫기</button>
                    </Modal>

                    {/* 이메일 변경 모달 */}
                    <Modal
                        isOpen={emailChangeModal} // 이메일 변경 모달 상태 체크
                        closeModal={() => setEmailChangeModal(false)} // 이메일 변경 모달 닫기
                    >
                        <h2>이메일 변경</h2>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)} // 새 이메일 입력
                            placeholder="새 이메일 입력"
                        />
                        <button onClick={handleEmailChange}>이메일 변경</button>
                        <button onClick={() => setEmailChangeModal(false)}>닫기</button>
                    </Modal>

                    {isAlarmOpen &&
                        <Alarm
                            isOpen={isAlarmOpen}
                            closeAlarm={() => setIsAlarmOpen(false)}
                            onClick={() => setIsAlarmOpen(false)}
                            btntext="확인"
                        >
                            {message}
                        </Alarm>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChangeSetting;