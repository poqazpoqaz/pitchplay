import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./NoticePost.module.css";
import Navbar from "../FAQNavbar/FAQNavbar";

function NoticePost({ gridArea }) {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

    // 필터 적용 함수
    const handleSearch = (query) => {
        setSearchQuery(query); // 검색창 입력값 업데이트
    };

    return (
        <div style={{ gridArea: gridArea }} className={styles["post-grid"]}>
            {/* Navbar에서 필터 입력값 전달 */}
            <Navbar gridArea="nav" onSearch={handleSearch} />
            
            <div style={{ gridArea: "posts" }}>
                {/* Outlet으로 검색 상태 전달 */}
                <Outlet context={{ searchQuery }} />
            </div>
        </div>
    );
}

export default NoticePost;
