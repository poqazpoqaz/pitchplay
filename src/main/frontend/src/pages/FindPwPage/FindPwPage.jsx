import styles from "./FindPwPage.module.css";
import FoundItems from "../../components/FoundItems";
import Button from "../../components/Button";
import Alarm from "../../components/Alarm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useEffect } from "react";
import axios from "axios";
import PwModal from "../../components/PwModal";
import { pwPattern } from "../../utils/regExp";
import { generateAuthCode } from "../../utils/authCode";

function FindPwPage() {
    const { state: userState, actions: userActions } = UserStore();
    const [authCode, setAuthCode] = useState('');
    const [message, setMessage] = useState('이름, 아이디, 이메일을 작성해주세요.'); // 알람메세지 
    const [isAlarmOpen, setIsAlarmOpen] = useState(false); // 알람창 오픈여부
    const [isValid, setIsValid] = useState(false); //비밀번호 유효성검사
    const [confirmedPassword, setConfirmedPassword] = useState(""); // 비밀번호 확인 상태

    // input 데이터 배열
    const inputFields = [
        {
            text: '이름', id: 'name', type: 'text', placeholder: '이름 입력',
            isvalid: true, value: userState.name, onChange: (e) => userActions.changeName(e.target.value)
        },
        {
            text: '아이디', id: 'id', type: 'text', placeholder: '아이디 입력',
            isvalid: true, value: userState.id, onChange: (e) => userActions.changeId(e.target.value)
        },
        {
            text: '이메일', id: 'email', type: 'email', placeholder: '이메일 입력',
            isvalid: true, hasButton: true, value: userState.email, onChange: (e) => userActions.changeEmail(e.target.value)
        },
        {
            text: '인증번호', id: 'verification', type: 'text', placeholder: '인증번호 입력',
            isvalid: true, value: authCode, onChange: (e) => setAuthCode(e.target.value)
        },
    ];

    // 이름, 이메일, 아이디가 모두 일치하는지 확인
    useEffect(() => {
        if (userState.name && userState.email && userState.id) {
            axios.get("/data/userData.json")
                .then(response => {
                    const user = response.data.find(user =>
                        user.name === userState.name &&
                        user.email === userState.email &&
                        user.id === userState.id
                    );

                    if (user) {
                        setMessage('이메일을 발송했습니다. 인증번호를 확인해주세요!');
                    } else {
                        setMessage('입력한 정보에 해당하는 유저가 없습니다. 다시 시도해주세요.');
                    }
                })
                .catch(error => {
                    setMessage('서버에서 오류가 발생했습니다. 다시 시도해주세요.');
                    setIsAlarmOpen(true); // 알람을 띄우기
                });
        }
    }, [userState.name, userState.email, userState.id]);

    // 인증번호 보내기 
    const handleAlarmOpen = () => {
        const code = generateAuthCode();
        localStorage.setItem('authCode', code); // 인증번호 저장
        setIsAlarmOpen(true);
    };

    // 인증번호 확인
    const verifyAuthCode = () => {
        const storedCode = localStorage.getItem("authCode"); // 저장된 인증번호 가져오기
        if (storedCode === authCode) {
            setIsValid(true);
            setMessage("");
        } else {
            setMessage('인증번호가 일치하지 않습니다. 다시 시도해주세요.');
            setIsAlarmOpen(true);
        }
    };


    // 비밀번호 변경 처리
    const handleSubmit = () => {
        if (userState.password !== confirmedPassword) {
            setMessage("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return; // 비밀번호가 일치하지 않으면 종료
        }

        if (!pwPattern.test(userState.password)) {
            setMessage("비밀번호는 영문과 숫자를 포함한 8~16자여야 합니다.");
            return;
        }

        setMessage("비밀번호가 성공적으로 변경되었습니다.");
        closeModal(); // 모달 닫기
    };

    return (
        <div className={styles['pwpage-grid']}>
            <div>
                <h3>비밀번호 찾기</h3>
                <p>이메일 인증 후 비밀번호 수정이 가능합니다.</p>
            </div>
            <div>
                <FoundItems
                    inputFields={inputFields}
                    onClick={handleAlarmOpen} />
            </div>
            <div>
                <p>비밀번호 찾기에 어려움이 있으신가요? </p>
                <Link to="/notices">FAQ 바로가기</Link>
            </div>
            <Button color="var(--main-color)" gridArea="btn" size="large" onClick={verifyAuthCode}>다음</Button>
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

            {isValid &&
                <PwModal
                    isOpen={isValid}
                    closeModal={() => setIsValid(false)}
                    userState={userState}
                    userActions={userActions}
                    confirmedPassword={confirmedPassword}
                    setConfirmedPassword={setConfirmedPassword}
                    message={message}
                    handleSubmit={handleSubmit}
                />
            }
        </div>
    )
}

export default FindPwPage;