// 6자리 랜덤 인증번호 생성 함수
export const generateAuthCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자
    return code;
};