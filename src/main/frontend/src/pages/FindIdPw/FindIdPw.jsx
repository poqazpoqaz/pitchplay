import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import TitleText from "../../components/TitleText";
import styles from "./FindIdPw.module.css";

function FindIdPw({ gridArea }) {
    const [activeSection, setActiveSection] = useState("id");

    const handleActiveSection = (section) => {
        setActiveSection(section); // 클릭한 항목을 활성화
    };

    return (
        <div style={{ gridArea: gridArea }} className={styles['findidpw-grid']}>
            <Link to="/find"
                className={`${styles.section} ${activeSection === "id" ? styles.active : ""}`}
                onClick={() => handleActiveSection("id")}
            >
                <TitleText color="#ffffff">아이디찾기</TitleText>
            </Link>

            <Link to="/find/pw"
                className={`${styles.section} ${activeSection === "pw" ? styles.active : ""}`}
                onClick={() => handleActiveSection("pw")}>
                <TitleText color="#ffffff">비밀번호찾기</TitleText>
            </Link>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default FindIdPw;