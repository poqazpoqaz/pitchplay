import { Link } from "react-router-dom";
import FoundItems from "../../components/FoundItems";
import Button from "../../components/Button";
import styles from "./FindIdPage.module.css";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useEffect, useState } from "react";
import Alarm from "../../components/Alarm";
import axios from "axios";
import IdModal from "../../components/IdModal";

function FindIdPage() {
    const { state: userState, actions: userActions } = UserStore();
    const [authCode, setAuthCode] = useState("");
    const [message, setMessage] = useState('이름과 이메일을 작성해주세요.');
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);

    // 6자리 랜덤 인증번호 생성 함수
    const generateAuthCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자
        return code;
    };

    // input 데이터 배열
    const inputFields = [
        { text: '이름', id: 'name', type: 'text', placeholder: '이름 입력', isvalid: true, value: userState.name, onChange: (e) => userActions.changeName(e.target.value) },
        { text: '이메일', id: 'email', type: 'email', placeholder: '이메일 입력', isvalid: true, hasButton: true, value: userState.email, onChange: (e) => userActions.changeEmail(e.target.value) },
        { text: '인증번호', id: 'verification', type: 'text', placeholder: '인증번호 입력', isvalid: true, value: authCode, onChange: (e) => setAuthCode(e.target.value) },
    ];

    // 이름 & 이메일 있는지 확인 
    useEffect(() => {
        if (userState.name && userState.email) {
            axios.get("/data/userData.json")
                .then(response => {
                    const user = response.data.find(user => user.name === userState.name && user.email === userState.email);
                    
                    if (user) {
                        setMessage('이메일을 발송했습니다. 인증번호를 확인해주세요!');
                        userActions.changeId(user.id);
                        userActions.changeJoinDate(user.joindate);

                    } else {
                        setMessage('해당하는 유저가 없습니다. 다시 시도해주세요.');
                    }
                })
                .catch(error => {
                    setMessage('서버에서 오류가 발생했습니다. 다시 시도해주세요.');
                    setIsAlarmOpen(true); // 알람을 띄우기
                });
        }
    }, [userState.name, userState.email]);

    // 인증번호 보내기 
    const handleAlarmOpen = () => {
        const code = generateAuthCode();
        localStorage.setItem('authCode', code); // 인증번호 저장
        setIsAlarmOpen(true);
    }

    // 인증번호 확인
    const verifyAuthCode = () => {
        const storedCode = localStorage.getItem("authCode"); // 저장된 인증번호 가져오기
        if (storedCode === authCode) {
            setIsValid(true);
        } else {
            setMessage('인증번호가 일치하지 않습니다. 다시 시도해주세요.');
            setIsAlarmOpen(true);
        }

    };
    return (
        <div className={styles['idpage-grid']}>
            <div>
                <h3>아이디 찾기</h3>
                <p>이메일 인증 후 가입한 아이디 확인이 가능합니다.</p>
            </div>
            <div>
                <FoundItems
                    inputFields={inputFields}
                    onClick={handleAlarmOpen} />
            </div>
            <div>
                <p>아이디 찾기에 어려움이 있으신가요? </p>
                <Link to="/notices">FAQ 바로가기</Link>
            </div>
            <Button color="var(--main-color)" gridArea="btn" size="large" onClick={verifyAuthCode} >다음</Button>
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
                <IdModal isOpen={isValid} closeModal={() => setIsValid(false)} userState={userState} />
            }
        </div>
    )
}

export default FindIdPage;