import { Outlet } from "react-router-dom";
import Sidebar from "../../../containers/mypageSidebar/Sidebar";
import styles from "./Mypage.module.css";

function MyPage({ gridArea }) {
    return (
        <div className={styles['mypage-grid']} style={{ gridArea: gridArea }}>
            <Sidebar gridArea={"sidebar"} />
            <div className={styles['mypage-content']}>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage;