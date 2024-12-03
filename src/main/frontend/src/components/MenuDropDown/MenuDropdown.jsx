import { useState } from "react";
import { motion } from "framer-motion";
import DeleteButton from "../DeleteButton";
import TitleText from "../TitleText";
import styles from "./MenuDropDown.module.css";
import MenuDropItem from "./MenuDropItem";
import { Link } from "react-router-dom";

function MenuDropdown({ isVisible, onClick }) {
  const menus = [
    { "name": "소셜매칭", "src": "/social" },
    { "name": "팀매칭", "src": "/team" },
    { "name": "구장예약", "src": "/reservation" },
    { "name": "공지사항", "src": "/notices" }
  ];

  // 클릭된 메뉴 확인
  const [selectedMenu, setSelectedMenu] = useState(null);

  // 메뉴 클릭 시, 선택된 메뉴를 관리하는 함수
  const handleClick = (index) => {
    setSelectedMenu(index);
  };

  // 메뉴 닫을 때 선택된 메뉴 초기화 및 onClick 호출
  const handleClose = () => {
    setSelectedMenu(null);
    onClick();
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user"); // localStorage에서 사용자 정보 제거
    window.location.href = "/"; // 홈 페이지로 리디렉션 (원하는 페이지로 변경 가능)
  };

  // 로그인 여부 체크
  const isLoggedIn = localStorage.getItem("user");

  return (
    <motion.div
      className={styles.menudropgrid}
      initial={{ x: "-120%" }}
      animate={{ x: isVisible ? 0 : "-120%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* 닫기 버튼 */}
      <div className={styles.close}>
        <DeleteButton color="#ffffff" size="medium" onClick={handleClose} />
      </div>

      {/* dropdown 제목 */}
      <div className={styles.title}>
        <TitleText color="var(--pink-color)" size="large">PITCHPLAY</TitleText>
      </div>

      {/* dropdown 아이템 */}
      <ul className={styles.menus}>
        {menus.map((menu, index) => (
          <MenuDropItem
            key={index}
            index={index}
            selectedMenu={selectedMenu}
            onClick={() => handleClick(index)}
            src={menu.src}
          >
            {menu.name}
          </MenuDropItem>
        ))}
      </ul>

      {/* 로그인 / 로그아웃  링크 */}
      <Link to={isLoggedIn ? "#" : "/login"}>
        <motion.p
          whileHover={{
            color: "#000000",
            transition: { duration: 0.3 },
          }}
          onClick={isLoggedIn ? handleLogout : null} // 로그인이 되어있으면 로그아웃 처리
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </motion.p>
      </Link>
    </motion.div>
  );
}

export default MenuDropdown;