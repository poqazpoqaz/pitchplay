import { useState } from "react";
import { motion } from "framer-motion";
import DeleteButton from "../DeleteButton";
import TitleText from "../TitleText";
import styles from "./MenuDropDown.module.css";

function MenuDropdown({ isVisible, onClick }) {
  const menus = ["소셜매칭", "팀매칭", "구장예약", "공지사항"];
  //클릭된 메뉴
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleClick = (index) => {
    setSelectedMenu(index);
  };

  const handleClose = () => {
    setSelectedMenu(null); // 메뉴 닫을 때 클릭된 메뉴 초기화
    onClick(); 
  };


  return (
    <motion.div
      className={styles.menudropgrid}
      initial={{ x: 0 }} // 처음에는 위치 0
      animate={{ x: isVisible ? 0 : "-120%" }} // 메뉴가 보일 때는 위치 0, 숨겨지면 -100%
      transition={{ duration: 0.3 }}
    >
      <div className={styles.close}>
        <DeleteButton color="#ffffff" size="medium" onClick={handleClose} />
      </div>
      <div className={styles.title}>
        <TitleText color="var(--pink-color)" size="large">PITCHPLAY</TitleText>
      </div>
      <ul className={styles.menus}>
        {menus.map((menu, index) => (
          <motion.li
            key={index}
            onClick={() => handleClick(index)} // 메뉴 클릭 시 상태 변경
            style={{
              backgroundColor:
              // 클릭된 항목에 진한 회색 배경 적용
                selectedMenu === index ? "#333333" : "transparent", 
              color: "#ffffff",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#f2f2f2",
              color: "#000000",
              transition: { duration: 0.3 },
            }}
          >
            {menu}
          </motion.li>
        ))}
      </ul>
      <a href="#">
        <motion.p
        whileHover={{
            color:"#000000",
            transition: {duration: 0.3}
        }}
        >로그인</motion.p>
      </a>
    </motion.div>
  );
}

export default MenuDropdown;