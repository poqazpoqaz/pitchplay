import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TitleText from "../../components/TitleText";
import styles from "./FindIdPw.module.css";


function FindIdPw({ gridArea }) {
    const location = useLocation();  // 현재 경로 정보 가져오기
    const [activeSection, setActiveSection] = useState("id");

    useEffect(() => {
        // URL 경로에 따라 activeSection을 설정
        if (location.pathname.includes("pw")) {
            setActiveSection("pw");
        } else {
            setActiveSection("id");
        }
    }, [location]);

    return (
        <div style={{ gridArea: gridArea }} className={styles['findidpw-grid']}>
            <Link to="/find"
                className={`${styles.section} ${activeSection === "id" ? styles.active : ""}`}>
                <TitleText color="#ffffff">아이디찾기</TitleText>
            </Link>

            <Link to="/find/pw"
                className={`${styles.section} ${activeSection === "pw" ? styles.active : ""}`}>
                <TitleText color="#ffffff">비밀번호찾기</TitleText>
            </Link>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default FindIdPw;