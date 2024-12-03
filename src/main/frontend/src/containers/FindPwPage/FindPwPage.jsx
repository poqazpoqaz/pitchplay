import styles from "./FindPwPage.module.css";

function FindPwPage() {
    // input 데이터 배열
    const inputFields = [
        { text: '이름', id: 'name', type: 'text', placeholder: '이름 입력', isvalid: true },
        { text: '아이디', id: 'id', type: 'text', placeholder: '아이디 입력', isvalid: true },
        { text: '이메일', id: 'email', type: 'email', placeholder: '이메일 입력', isvalid: true, hasButton: true },
        { text: '인증번호', id: 'verification', type: 'text', placeholder: '인증번호 입력', isvalid: true },
    ];

    return (
        <div className={styles['pwpage-grid']}>
            <div>
                <h3>아이디 찾기</h3>
                <p>이메일 인증 후 가입한 아이디 확인이 가능합니다.</p>
            </div>
            <div>
                <FoundItems inputFields={inputFields} />
            </div>
            <div>
                <p>아이디 찾기에 어려움이 있으신가요? </p>
                <Link to="/notices">FAQ 바로가기</Link>
            </div>
            <Button color="var(--main-color)" gridArea="btn">다음</Button>
        </div>
    )
}

export default FindPwPage;