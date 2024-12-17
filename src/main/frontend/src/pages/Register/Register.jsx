import { useState } from "react";
import emailjs from "emailjs-com";
import LabelInput from "../../components/LabelInput";
import { emailPattern, phonePattern, pwPattern, namePattern, idPattern, nicknamePattern, birthPattern } from "../../utils/regExp";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

function Register({ gridArea }) {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [sentAuthCode, setSentAuthCode] = useState('');

    const [isNameValid, setIsNameValid] = useState(false);
    const [isBirthdayValid, setIsBirthdayValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isIdValid, setIsIdValid] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [isAuthCodeValid, setIsAuthCodeValid] = useState(false);

    const navigate = useNavigate();

    const SERVICE_ID = "service_iouinfj";
    const TEMPLATE_ID = "template_9imdgrp";
    const USER_ID = "wyzN0MU2WgnpjNJmq";

    // 유효성 검사 핸들러
    const handleName = (e) => {
        setName(e.target.value);
        setIsNameValid(namePattern.test(e.target.value));
    };

    const handleBirthday = (e) => {
        setBirthday(e.target.value);
        setIsBirthdayValid(birthPattern.test(e.target.value));
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setIsEmailValid(emailPattern.test(e.target.value));
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
        setIsPhoneValid(phonePattern.test(e.target.value));
    };

    const handleId = (e) => {
        setId(e.target.value);
        setIsIdValid(idPattern.test(e.target.value));
    };

    const handleNickname = (e) => {
        setNickname(e.target.value);
        setIsNicknameValid(nicknamePattern.test(e.target.value));
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setIsPasswordValid(pwPattern.test(e.target.value));
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsConfirmPasswordValid(e.target.value === password);
    };

    const handleAuthCode = (e) => {
        setAuthCode(e.target.value);
        setIsAuthCodeValid(e.target.value.length === 6);
    };

    // 이메일 인증번호 발송
    const sendAuthCode = () => {
        if (!isEmailValid) {
            alert("유효한 이메일을 입력해주세요.");
            return;
        }

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setSentAuthCode(generatedCode);

        const templateParams = {
            name: "고객님",
            message: `인증번호는 ${generatedCode}입니다.`,
        };

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
            .then(() => alert("인증번호가 이메일로 전송되었습니다."))
            .catch(() => alert("이메일 전송에 실패했습니다."));
    };

    // 인증번호 확인
    const verifyAuthCode = () => {
        if (authCode === sentAuthCode) {
            setIsAuthCodeValid(true);
            alert("이메일 인증이 완료되었습니다.");
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    };

    // 회원가입 제출
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isNameValid) {
            alert("이름을 올바르게 입력해주세요.");
            return;
        }

        if (!isBirthdayValid) {
            alert("생년월일을 올바르게 입력해주세요.");
            return;
        }

        if (!isPhoneValid) {
            alert("휴대폰 번호를 올바르게 입력해주세요.");
            return;
        }
        
        if (!isEmailValid) {
            alert("올바른 이메일 형식을 입력해주세요.");
            return;
        }
        

        if (!isIdValid) {
            alert("아이디를 올바르게 입력해주세요.");
            return;
        }

        if (!isNicknameValid) {
            alert("닉네임을 올바르게 입력해주세요.");
            return;
        }

        if (!isPasswordValid) {
            alert("비밀번호를 올바르게 입력해주세요.");
            return;
        }

        if (!isConfirmPasswordValid) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!isAuthCodeValid) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        navigate("/login");
        alert("회원가입이 완료되었습니다.");
    };



    return (
        <div className={styles.register} style={{ gridArea: gridArea }}>
            <h2 className={styles['register-title']} style={{ fontSize: "50px", textAlign: "center", marginTop: "20px" }}>회원가입</h2>
            <form onSubmit={handleSubmit} className={styles['register-grid']}>
                <LabelInput id="name" text="성명" type="text" placeholder="예) 홍길동" onChange={handleName} value={name} isvalid={isNameValid} gridArea="inp1" />
                <LabelInput id="birthday" text="생년월일" type="text" placeholder="예) YYYYMMDD" onChange={handleBirthday} value={birthday} isvalid={isBirthdayValid} gridArea="inp2" />
                <LabelInput id="phone" text="휴대폰 번호" type="text" placeholder="예) 010-0000-0000" onChange={handlePhone} value={phone} isvalid={isPhoneValid} gridArea="inp3" />
                <LabelInput id="email" text="이메일" type="email" placeholder="예) kosmo@kosmo.com" onChange={handleEmail} value={email} isvalid={isEmailValid} gridArea="inp4" />
                <Button color='var(--main-color)' onClick={sendAuthCode} type="button" gridArea="btn4">인증번호 보내기</Button>
                <LabelInput id="authCode" text="인증번호" type="text" placeholder="인증번호를 입력해주세요" onChange={handleAuthCode} value={authCode} isvalid={isAuthCodeValid} gridArea="inp5" />
                <Button color='var(--main-color)' onClick={verifyAuthCode} type="button" gridArea="btn5">인증하기</Button>
                <LabelInput id="id" text="아이디" type="text" placeholder="예) kosmo" onChange={handleId} value={id} isvalid={isIdValid} gridArea="inp6" />
                <Button color='var(--main-color)' onClick={() => alert("사용 가능한 아이디입니다.")} type="button" gridArea="btn6">중복확인</Button>
                <LabelInput id="nickname" text="닉네임" type="text" placeholder="예) 코스모스" onChange={handleNickname} value={nickname} isvalid={isNicknameValid} gridArea="inp7" />
                <Button color='var(--main-color)' onClick={() => alert("사용 가능한 닉네임입니다.")} type="button" gridArea="btn7">중복확인</Button>
                <LabelInput id="password" text="비밀번호" type="password" placeholder="비밀번호 입력" onChange={handlePassword} value={password} isvalid={isPasswordValid} gridArea="inp8" />
                <LabelInput id="confirmPassword" text="비밀번호 확인" type="password" placeholder="비밀번호 확인" onChange={handleConfirmPassword} value={confirmPassword} isvalid={isConfirmPasswordValid} gridArea="inp9" />
                <Button onClick={handleSubmit} color='var(--main-color)' type="submit" gridArea="sumbtn">가입하기</Button>
            </form>
        </div>
    );
}

export default Register;


