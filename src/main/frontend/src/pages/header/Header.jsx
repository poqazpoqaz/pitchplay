import HeaderLogo from "./HeaderLogo";
import MenuDropdown from "../../components/menuDropdown/MenuDropdown";
import styles from "./Header.module.css";
import mypage from "./mypage.svg";
import search from "./search.svg";
import setting from "./setting.svg";
import menu from "./menu.svg";
import TitleText from "../../components/TitleText";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Header() {
    // 메뉴가 열려있는지 닫혀있는지를 관리하는 상태
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    }

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest(`.${styles.menudropgrid}`) && // MenuDropdown 외부 클릭
                !event.target.closest(`.${styles['header-left']}`) && // Header-Left 외부 클릭
                isMenuVisible
            ) {
                closeMenu();
            }
        };

        // 클릭 이벤트 리스너 추가
        document.addEventListener("click", handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMenuVisible]); // `isMenuVisible`이 변경될 때마다 이벤트 리스너가 작동하도록 설정

    //로그인 되어있는지 여부 확인
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className={styles['header-container']} style={{ gridArea: "header" }}>
            <div className={styles['header-left']}>
                <div onClick={openMenu} className={styles['header-menu']}>
                    <img src={menu} />
                    <TitleText color="white">MENU</TitleText>
                </div>
            </div>
            <MenuDropdown isVisible={isMenuVisible} onClick={closeMenu} />
            <div className={styles['header-middle']}>
                <HeaderLogo />
            </div>
            <ul className={styles['header-right']}>
                <Link to={user ? `/mypage/${user.id}` : `/login`}><img src={mypage} /></Link>
                <Link to="#"><img src={search} /></Link>
                <Link to="#"><img src={setting} /></Link>
            </ul>
        </div>
    )
}

export default Header;