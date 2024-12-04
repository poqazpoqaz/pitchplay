import styles from "./Sidebar.module.css"; // CSS 모듈 import
import Dashboard from "./Dashboard.svg";
import MembershipManagement from "./MembershipManagement.svg";
import MatchingManagement from "./MatchingManagement.svg";
import TeamManagement from "./TeamManagement.svg";
import StadiumReservation from "./StadiumReservation.svg";
import NoticeBoard from "./NoticeBoard.svg";
import PaymentManagement from "./PaymentManagement.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ gridArea }) => {
  const navigate = useNavigate();
  const url = useLocation();

  const currentPath = url.pathname.split("/").splice(2);

  // 기본적으로 "대시보드" 메뉴가 선택되도록 처리
  const defaultActive = currentPath.length === 0 || currentPath[0] === 'dashboard';

  const menuItems = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: Dashboard,
      handleClick: () => navigate("/admin"),
    },
    {
      id: "member-management",
      label: "회원관리",
      icon: MembershipManagement,
      handleClick: () => navigate("/admin/member-management"),
    },
    {
      id: "matching-management",
      label: "매칭관리",
      icon: MatchingManagement,
      handleClick: () => navigate("/admin/matching-management"),
    },
    {
      id: "team-management",
      label: "팀관리",
      icon: TeamManagement,
      handleClick: () => navigate("/admin/team-management"),
    },
    {
      id: "stadium-reservation",
      label: "구장예약",
      icon: StadiumReservation,
      handleClick: () => navigate("/admin/stadium-reservation"),
    },
    {
      id: "notice-board",
      label: "게시판",
      icon: NoticeBoard,
      handleClick: () => navigate("/admin/notice-board/post"),
    },
    {
      id: "payment-management",
      label: "결제관리",
      icon: PaymentManagement,
      handleClick: () => navigate("/admin/payment-management"),
    },
  ];

  return (
    <div className={styles.sidebar} style={{ gridArea: gridArea }}>
      {menuItems.map(({ id, label, icon, handleClick }) => (
        <motion.button
          key={id}
          whileHover={{
            scale: 1.1, 
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`${styles.sidebarItem} 
            ${currentPath.includes(id) || (defaultActive && id === "dashboard") ? styles.active : ""}`}
          onClick={handleClick}
        >
          <img
            src={icon}
            alt={`${label} icon`}
            className={styles.sidebarIcon}
          />
          <span className={styles.sidebarText}>{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default Sidebar;