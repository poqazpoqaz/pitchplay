import styles from "./GujangNavbar.module.css";
import SearchInput from "../SearchInput";

function GujangNavbar({ onSearchButtonClick }) {
    return (
        <div className={styles['navbar-grid']}>
            <h1 className={`${styles.title}`}>구장예약</h1>
            <SearchInput gridArea="search" size="large" onClick={onSearchButtonClick} />
        </div>
    );
}

export default GujangNavbar;