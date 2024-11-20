import styles from "./Main.module.css"
import Header from "../containers/header/Header"
import MainSection from "../components/Main/MainSection"
import Footer from "../containers/footer/Footer"

function Main() {
    return (
        <div className={styles.mainGrid}>
            <Header/>
            <MainSection/>
            <Footer />
        </div>
    );
}

export default Main;