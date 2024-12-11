import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import MenuDropdown from "../../components/menuDropdown/MenuDropdown";
import TotalModal from "../../components/TotalModal/TotalModal"; // TotalModal 임포트
import styles from "./Header.module.css";
import mypage from "./mypage.svg";
import search from "./search.svg";
import setting from "./setting.svg";
import menu from "./menu.svg";
import TitleText from "../../components/TitleText";

function Header() {
    // 메뉴 및 모달 상태 관리
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // React Router's navigation

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest(`.${styles.menudropgrid}`) && // MenuDropdown 외부 클릭
                !event.target.closest(`.${styles["header-left"]}`) && // Header-Left 외부 클릭
                isMenuVisible
            ) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMenuVisible]);

    // 로그인 여부와 사용자 역할 확인
    const user = JSON.parse(localStorage.getItem("user"));

    const handleAdminClick = (event) => {
        if (!user || user.role !== "admin") {
            event.preventDefault(); // 링크 동작 막기
            alert("관리자만 접근할 수 있습니다."); // 경고 메시지로 alert 사용
        }
    };

    return (
        <div className={styles["header-container"]} style={{ gridArea: "header" }}>
            {/* 왼쪽 메뉴 */}
            <div className={styles["header-left"]}>
                <div onClick={openMenu} className={styles["header-menu"]}>
                    <img src={menu} />
                    <TitleText color="white">MENU</TitleText>
                </div>
            </div>
            <MenuDropdown isVisible={isMenuVisible} onClick={closeMenu} />

            {/* 중간 로고 */}
            <div className={styles["header-middle"]}>
                <HeaderLogo />
            </div>

            {/* 오른쪽 메뉴 */}
            <ul className={styles["header-right"]}>
                {/* 마이페이지 링크 */}
                <Link to={user ? `/mypage/${user.id}` : `/login`}>
                    <img src={mypage} />
                </Link>
                
                {/* 검색 버튼 */}
                <Link to="#" onClick={openModal}>
                    <img src={search} />
                </Link>
                
                {/* 관리자 페이지 링크 */}
                <Link to="/admin" onClick={handleAdminClick}>
                    <img src={setting} />
                </Link>
            </ul>

            {/* TotalModal 컴포넌트 */}
            <TotalModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Header;
