import { useState } from "react";
import { motion } from "framer-motion";
import DeleteButton from "../DeleteButton";
import TitleText from "../TitleText";
import styles from "./MenuDropDown.module.css";
import MenuDropItem from "./MenuDropItem"; 

function MenuDropdown({ isVisible, onClick }) {
  const menus = [
    {"name" : "소셜매칭", "src" : "#"}, 
    {"name" : "팀매칭", "src" : "/team"}, 
    {"name" : "구장예약", "src" : "/reservation"}, 
    {"name" : "공지사항", "src" : "/notices"}
  ];

  //클릭된 메뉴 확인
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

  return (
    //전체 grid
    <motion.div
      className={styles.menudropgrid}
      initial={{ x: "-120%" }}
      animate={{ x: isVisible ? 0 : "-120%" }}
      transition={{ duration: 0.3 }}
    >
      {/* 닫기 */}
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
            selectedMenu={selectedMenu} // selectedMenu를 전달
            onClick={() => handleClick(index)} // 클릭 시 해당 메뉴를 선택하도록 처리
            src={menu.src}
          >
            {menu.name}
          </MenuDropItem>
        ))}
      </ul>

      {/* dropdown 로그인 */}
      <a href="/login">
        <motion.p
          whileHover={{
            color: "#000000",
            transition: { duration: 0.3 },
          }}
        >
          로그인
        </motion.p>
      </a>
    </motion.div >
  );
}

export default MenuDropdown;