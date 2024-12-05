import Footer from "../Footer/Footer";
import Header from "../Header/Header"
import styles from "./Main.module.css";
import { Outlet, useLocation } from 'react-router-dom';
import AdminHeader from "../Header/AdminHeader";


function Main() {

  const location = useLocation(); // 현재 경로 확인

  const isAdminPage = location.pathname.startsWith("/admin"); // 경로가 /admin으로 시작하는지 확인

  return (
    <div className={styles["main-grid"]}>
      {isAdminPage ? <AdminHeader /> : <Header />} {/* 경로에 따라 헤더 결정 */}
      <Outlet />
      <Footer />
   </div>

  );
}

export default Main;