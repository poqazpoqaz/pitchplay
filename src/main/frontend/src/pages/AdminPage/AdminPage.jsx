import { Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import styles from "./AdminPage.module.css";

function AdminPage({ gridArea }) {
    return (
        <div className={styles['admin-page-grid']} style={{ gridArea: gridArea }}>
            <Sidebar gridArea="side" />
            <div className={styles['admin-page-content']}>
                <Outlet />
            </div>
        </div>
    )
}
export default AdminPage;