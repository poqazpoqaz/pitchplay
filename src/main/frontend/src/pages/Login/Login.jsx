import axios from "axios";
import styles from "./Login.module.css";
import TitleText from "../../components/TitleText";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import Alarm from "../../components/Alarm";

function Login({ gridArea }) {
    const { state: userState, actions: userActions } = UserStore();
    const [message, setMessage] = useState("아이디와 비밀번호를 입력해주세요.");
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);

    const handleIdChange = (e) => {
        userActions.changeId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        userActions.changePassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!userState.id || !userState.password) {
            setMessage("아이디와 비밀번호를 입력해주세요.");
            setIsAlarmOpen(true);
            return;
        }

        try {
            const response = await axios.get("/data/userData.json");
            const userData = response.data;

            // 아이디와 비밀번호가 일치하는 사용자 찾기
            const user = userData.find(
                (user) =>
                    user.id === userState.id && user.password === userState.password
            );

            if (user) {
                // 로그인 성공 시 상태 업데이트 
                userActions.updateAllFields(user);

                // 사용자 정보를 localStorage에 저장
                localStorage.setItem("user", JSON.stringify(user));

                // 로그인 후 메인 페이지로 리디렉션
                window.location.href = "/";
            } else {
                // 로그인 실패 시 에러 메시지
                setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
                setIsAlarmOpen(true);
            }
        } catch (error) {
            console.error(error);
            setMessage("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            setIsAlarmOpen(true);
        }
    };

    return (
        <div className={styles['login-grid']} style={{ gridArea: gridArea }}>
            <TitleText color="#000000" size="xlarge" gridArea="title">
                로그인
            </TitleText>

            <Input
                type="text"
                placeholder="아이디"
                onChange={handleIdChange}
                value={userState.id}
                gridArea="inp1"
                size="small"
            />

            <Input
                type="password"
                placeholder="비밀번호"
                onChange={handlePasswordChange}
                value={userState.password}
                gridArea="inp2"
                size="small"
            />

            <Button type="button" onClick={handleLogin} color="var(--main-color)" gridArea="logbtn" size="large">
                로그인
            </Button>
            <div className={styles['login-link']}>
                <Link to={'/find'}><p>아이디 찾기</p></Link>
                <Link to={'/find/pw'}><p>비밀번호 찾기</p></Link>
                <Link to={'/register'}><p>회원가입</p></Link>
            </div>

            {isAlarmOpen &&
                <Alarm
                    isOpen={isAlarmOpen}
                    closeAlarm={() => setIsAlarmOpen(false)}
                    onClick={() => setIsAlarmOpen(false)}
                    btntext="확인"
                >
                    {message} {/* 현재 메시지 상태를 표시 */}
                </Alarm>
            }
        </div>
    );
}

export default Login;