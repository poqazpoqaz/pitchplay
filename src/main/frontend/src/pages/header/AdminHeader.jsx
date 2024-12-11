import HeaderLogo from "./HeaderLogo";
import styles from "./AdminHeader.module.css";
import home from "./home.svg";
import TitleText from "../../components/TitleText";
import { Link } from "react-router-dom";


function AdminHeader() {
    return (
        <div className={styles['header-container']} style={{ gridArea: "header" }}>
            <div className={styles['header-left']}>
                <div className={styles['header-menu']}>
                    <TitleText color="white">관리자페이지</TitleText>
                </div>
            </div>
            <div className={styles['header-middle']}>
                <HeaderLogo />
            </div>
            <Link to="/" className={styles['header-right']}><img src={home} /></Link>
        </div>
    )
}

export default AdminHeader;