import styles from "./GujangNavbar.module.css";
import SearchInput from "../SearchInput";

function GujangNavbar() {
    return (
        <div className={styles['navbar-grid']}>
             <h1 className={`${styles.title}`}>구장예약</h1>
            <SearchInput gridArea="search" size="large" placeholder="검색할 단어를 작성해주세요."/>
        </div>
    )
}

export default GujangNavbar;
