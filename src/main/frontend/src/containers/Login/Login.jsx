// 아이디랑 패스워드 연동해서 확인해야함

import axios from "axios"
import styles from "./Login.module.css"
import TitleText from "../../components/TitleText"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useState } from "react";
import { Link } from "react-router-dom"
import { style } from "framer-motion/client"

function Login({ gridArea }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!id || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        await axios.post("보낼곳주소!!", {
            id: id,
            pw: pw
        }).then(response => {
            if (response.status == 200) {
                //  actions랑 연동할 로직 !!!! 
            } else {
                console.log(response.status);
                throw new Error("아이디/비밀번호가 일치하지 않습니다.");
            }
        }).catch(error => console.log(error));

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
                value={id}
                gridArea="inp1"
                size="small"
            />

            <Input
                type="password"
                placeholder="비밀번호"
                onChange={handlePasswordChange}
                value={password}
                gridArea="inp2"
                size="small"
            />

            <Button type="button" onClick={handleLogin} color="var(--main-color)" gridArea="logbtn">
                로그인
            </Button>
            <div className={styles['login-link']}>
                <a href="#"><p>아이디 찾기</p></a>
                <a href="#"><p>비밀번호 찾기</p></a>
                <Link to={'/register'}><p>회원가입</p></Link>
            </div>
        </div>
    );
}
export default Login;