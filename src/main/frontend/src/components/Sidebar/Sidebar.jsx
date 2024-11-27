import React, { useState } from "react";
import styles from "./Sidebar.module.css"; // CSS 모듈 import
import Dashboard from "./Dashboard.svg";
import MembershipManagement from "./MembershipManagement.svg";
import MatchingManagement from "./MatchingManagement.svg";
import TeamManagement from "./TeamManagement.svg";
import StadiumReservation from "./StadiumReservation.svg";
import NoticeBoard from "./NoticeBoard.svg";
import PaymentManagement from "./PaymentManagement.svg";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { id: 0, label: "대시보드", icon: Dashboard },
    { id: 1, label: "회원관리", icon: MembershipManagement },
    { id: 2, label: "매칭관리", icon: MatchingManagement },
    { id: 3, label: "팀관리", icon: TeamManagement },
    { id: 4, label: "구장예약", icon: StadiumReservation },
    { id: 5, label: "게시판", icon: NoticeBoard },
    { id: 6, label: "결제관리", icon: PaymentManagement },
  ];

  return (
    <div className={styles.sidebar}>
      {menuItems.map(({ id, label, icon }) => (
        <button
          key={id}
          className={`${styles.sidebarItem} ${
            activeIndex === id ? styles.active : ""
          }`}
          onClick={() => setActiveIndex(id)}
        >
          <img src={icon} alt={`${label} icon`} className={styles.sidebarIcon} />
          <span className={styles.sidebarText}>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
