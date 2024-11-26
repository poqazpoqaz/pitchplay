import Footer from "../Footer/Footer";
import Header from "../Header/Header"
import styles from "./Main.module.css";
import { Outlet } from 'react-router-dom';


function Main() {

  return (
    <div className={styles['main-grid']}>
      <Header />
      <Outlet />
      <Footer />
    </div>

  );
}

export default Main;