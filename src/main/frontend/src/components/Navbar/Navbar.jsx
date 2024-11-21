import DefaultButton from "../DefaultButton";
import styles from "./Navbar.module.css";
import SearchInput from "../SearchInput";

function Navbar() {
    return (
        <div className={styles['navbar-grid']}>
            <DefaultButton color='var(--main-color)' gridArea="btn1" size="xlarge">팀 매칭</DefaultButton>
            <DefaultButton color='var(--main-color)' gridArea="btn2" size="xlarge">팀원모집</DefaultButton>
            <DefaultButton color='var(--main-color)' gridArea="btn3" size="xlarge">용병모집</DefaultButton>
            <DefaultButton color='var(--main-color)' gridArea="btn4" size="xlarge">팀원모집</DefaultButton>
            <SearchInput gridArea="search" size="large" placeholder="검색할 단어를 작성해주세요."/>
        </div>
    )
}

export default Navbar;
