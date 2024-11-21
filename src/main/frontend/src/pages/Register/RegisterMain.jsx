import Footer from "../../containers/footer/Footer";
import Header from "../../containers/header/Header";
import Register from "../../containers/Register/Register";
import styles from "./RegisterMain.module.css";

function RegisterMain() {
    return (
        <div className={styles['registermain-grid']}>
            <Header />
            <Register gridArea={"register"} />
            <Footer />
        </div>
    )
}

export default RegisterMain;