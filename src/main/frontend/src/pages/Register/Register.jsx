// 인증번호 발송, 인증하기, 중복확인 등은 로직 짜야합니다 !!!!_!!!!! 

import { useState } from "react";
import LabelInput from "../../components/LabelInput";
import { emailPattern, phonePattern, pwPattern, namePattern, idPattern, nicknamePattern, birthPattern } from "../../utils/regExp"
import Button from "../../components/Button";
import styles from "./Register.module.css";
import {useStore} from "../../stores/UserStore/useStore";

function Register({gridArea}) {
    const {state, actions} = useStore();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [authCode, setAuthCode] = useState('');

    const [isNameValid, setIsNameValid] = useState(false);
    const [isBirthdayValid, setIsBirthdayValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isIdValid, setIsIdValid] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [isAuthCodeValid, setIsAuthCodeValid] = useState(false);


    // 유효성 검사 함수
    const handleName = (e) => {
        actions.changeName(e.target.value);
        setIsNameValid(namePattern.test(e.target.value)); // namePattern으로 유효성 검사
    };

    const handleBirthday = (e) => {
        actions.changeBirthday(e.target.value);
        setIsBirthdayValid(birthPattern.test(e.target.value)); // birthPattern으로 유효성 검사
    };

    const handlePhone = (e) => {
        actions.changePhone(e.target.value);
        setIsPhoneValid(phonePattern.test(e.target.value)); // phonePattern으로 유효성 검사
    };

    const handleEmail = (e) => {
        actions.changeEmail(e.target.value);
        setIsEmailValid(emailPattern.test(e.target.value)); // emailPattern으로 유효성 검사
    };

    const handleId = (e) => {
        actions.changeId(e.target.value);
        setIsIdValid(idPattern.test(e.target.value)); // idPattern으로 유효성 검사
    };

    const handleNickname = (e) => {
        actions.changeNickname(e.target.value);
        setIsNicknameValid(nicknamePattern.test(e.target.value)); // nicknamePattern으로 유효성 검사
    };

    const handlePassword = (e) => {
        actions.changePassword(e.taget.value);
        setIsPasswordValid(pwPattern.test(e.target.value)); // pwPattern으로 유효성 검사
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsConfirmPasswordValid(e.target.value === password); // 비밀번호 일치 여부 체크
    };

    const handleAuthCode = (e) => {
        setAuthCode(e.target.value);
        //// 이메일 인증번호랑 맞는지 확인하는 로직 작성!! 필요!!! 
        setIsAuthCodeValid(e.target.value.length === 6);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNameValid && isBirthdayValid && isEmailValid && isPhoneValid && isIdValid && isNicknameValid && isPasswordValid && isConfirmPasswordValid && isAuthCodeValid) {
            alert('회원가입 성공!');
        } else {
            alert('입력 값이 올바르지 않습니다.');
        }
    };

    return (
        <div className={styles.register} style={{gridArea: gridArea}}>
            <h2 className={styles['register-title']} style={{ fontSize: "50px", textAlign: "center", marginTop:"20px" }}>회원가입</h2>
            <form onSubmit={handleSubmit} className={styles['register-grid']}>
                <LabelInput
                    id="name"
                    text="성명"
                    type="text"
                    placeholder="예) 홍길동"
                    onChange={handleName}
                    value={state.name}
                    isvalid={isNameValid}
                    gridArea="inp1"
                    size="small"
                />

                <LabelInput
                    id="birthday"
                    text="생년월일"
                    type="text"
                    placeholder="예) YYYYMMDD"
                    onChange={handleBirthday}
                    value={state.birthday}
                    isvalid={isBirthdayValid}
                    gridArea="inp2"
                    size="small"
                />

                <LabelInput
                    id="phone"
                    text="휴대폰 번호"
                    type="tel"
                    placeholder="예) 010-0000-0000"
                    onChange={handlePhone}
                    value={state.phone}
                    isvalid={isPhoneValid}
                    gridArea="inp3"
                    size="small"
                />

                <LabelInput
                    id="email"
                    text="이메일"
                    type="email"
                    placeholder="예) kosmo@kosmo.com"
                    onChange={handleEmail}
                    value={state.email}
                    isvalid={isEmailValid}
                    gridArea="inp4"
                    size="small"
                />
                <Button color='var(--main-color)'
                    onClick={() => alert("인증번호가맞습니다.")}
                    type="button"
                    gridArea="btn4"
                >
                    인증번호보내기</Button>


                <LabelInput
                    id="authCode"
                    text="인증번호"
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    onChange={handleAuthCode}
                    value={authCode}
                    isvalid={isAuthCodeValid}
                    gridArea="inp5"
                    size="small"
                />

                <Button color='var(--main-color)'
                    onClick={() => alert("인증번호가맞습니다.")}
                    type="button"
                    gridArea="btn5"
                >
                    인증하기</Button>

                <LabelInput
                    id="id"
                    text="아이디"
                    type="text"
                    placeholder="예) kosmo"
                    onChange={handleId}
                    value={state.id}
                    isvalid={isIdValid}
                    gridArea="inp6"
                    size="small"
                />
                <Button color='var(--main-color)'
                    onClick={() => alert("사용하실수있는 닉네임입니다.")}
                    type="button"
                    gridArea="btn6"
                >
                    중복확인</Button>

                <LabelInput
                    id="nickname"
                    text="닉네임"
                    type="text"
                    placeholder="예) 코스모스"
                    onChange={handleNickname}
                    value={state.nickname}
                    isvalid={isNicknameValid}
                    gridArea="inp7"
                    size="small"
                />
                <Button color='var(--main-color)'
                    onClick={() => alert("사용하실수있는 닉네임입니다.")}
                    type="button"
                    gridArea="btn7"
                >
                    중복확인</Button>

                <LabelInput
                    id="password"
                    text="비밀번호"
                    type="password"
                    placeholder="예) 영문 숫자 조합 8~16자"
                    onChange={handlePassword}
                    value={state.password}
                    isvalid={isPasswordValid}
                    gridArea="inp8"
                    size="small"
                />

                <LabelInput
                    id="confirmPassword"
                    text="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    isvalid={isConfirmPasswordValid}
                    gridArea="inp9"
                    size="small"
                />

                <Button type="submit" color='var(--main-color)'
                    onClick={handleSubmit}
                    gridArea="sumbtn"
                >가입하기</Button>
            </form>

        </div >
    );
}

export default Register;