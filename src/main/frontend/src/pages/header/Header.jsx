import HeaderLogo from "./HeaderLogo";
import MenuDropdown from "../../components/menuDropdown/MenuDropdown";
import styles from "./Header.module.css";
import mypage from "./mypage.svg";
import search from "./search.svg";
import setting from "./setting.svg";
import menu from "./menu.svg";
import TitleText from "../../components/TitleText";
import { useState } from "react";
import { Link } from "react-router-dom";


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
        <div className={styles['header-container']} style={{gridArea: "header"}}>
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
                <Link to="mypage"><img src={mypage} /></Link>   
                <a href="#"><img src={search} /></a>
                <a href="#"><img src={setting} /></a>
            </ul>
        </div>
    )
}

export default Header;