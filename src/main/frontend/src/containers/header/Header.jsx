import HeaderLogo from "./HeaderLogo";
import MenuDropdown from "../../components/menuDropdown/MenuDropdown";
import styles from "./Header.module.css";
import mypage from "./mypage.svg";
import search from "./search.svg";
import setting from "./setting.svg";
import menu from "./menu.svg";
import TitleText from "../../components/TitleText";
import { useState } from "react";


function Header() {
    // 메뉴가 열려있는지 닫혀있는지를 관리하는 상태
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // 메뉴 열기 함수 (MenuDropdown 컴포넌트에서 닫는 기능은 내부에서 처리)
    const openMenu = () => {
        setIsMenuVisible(true); // 메뉴를 열기
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <div onClick={openMenu} className={styles.headerMenu}>
                    <img src={menu} />
                    <TitleText color="white">MENU</TitleText>
                </div>
            </div>
            <MenuDropdown isVisible={isMenuVisible} onClick={closeMenu} />
            <div className={styles.headerMiddle}>
                <HeaderLogo />
            </div>
            <ul className={styles.headerRight}>
                <a href="#"><img src={mypage} /></a>
                <a href="#"><img src={search} /></a>
                <a href="#"><img src={setting} /></a>
            </ul>
        </div>
    )
}

export default Header;