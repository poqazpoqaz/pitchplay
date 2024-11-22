import { motion } from "framer-motion";

function MenuDropItem({ children, selectedMenu, onClick, index, src}) {

    return (
        <a href={src}>
            <motion.li
                onClick={onClick} // 클릭 시 부모로 전달된 onClick 호출
                style={{
                    // 클릭된 항목에 진한 회색 배경 적용
                    backgroundColor: selectedMenu == index? "rgba(51, 51, 51, 0.5)" : "rgba(0, 0, 0, 0)", 
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
                {children}
            </motion.li>
        </a>
    );
}

export default MenuDropItem;