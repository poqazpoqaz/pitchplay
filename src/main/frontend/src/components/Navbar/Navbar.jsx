import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DefaultButton from "../DefaultButton";
import SearchInput from "../SearchInput";
import styles from "./Navbar.module.css";

function Navbar({ gridArea, onSearch }) {
    const [activeButton, setActiveButton] = useState("btn1");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/team") {
            setActiveButton("btn1");
        } else if (location.pathname === "/team/member") {
            setActiveButton("btn2");
        } else if (location.pathname === "/team/guestplayer") {
            setActiveButton("btn3");
        } else if (location.pathname === "/team/creation") {
            setActiveButton("btn4");
        }
    }, [location]);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch();
        }
    };

    return (
        <div className={styles["navbar-grid"]} style={{ gridArea: gridArea }}>
            <DefaultButton
                color="var(--main-color)"
                gridArea="btn1"
                size="xlarge"
                isActive={activeButton === "btn1"}
                onClick={() => handleButtonClick("btn1")}
                src="/team"
            >
                팀 매칭
            </DefaultButton>
            <DefaultButton
                color="var(--main-color)"
                gridArea="btn2"
                size="xlarge"
                isActive={activeButton === "btn2"}
                onClick={() => handleButtonClick("btn2")}
                src="/team/member"
            >
                팀원모집
            </DefaultButton>
            <DefaultButton
                color="var(--main-color)"
                gridArea="btn3"
                size="xlarge"
                isActive={activeButton === "btn3"}
                onClick={() => handleButtonClick("btn3")}
                src="/team/guestplayer"
            >
                용병모집
            </DefaultButton>
            <DefaultButton
                color="var(--main-color)"
                gridArea="btn4"
                size="xlarge"
                isActive={activeButton === "btn4"}
                onClick={() => handleButtonClick("btn4")}
                src="/team/creation"
            >
                팀만들기
            </DefaultButton>
            <SearchInput
                gridArea="search"
                size="large"
                placeholder="통합 검색 불러오기"
                onClick={handleSearchClick}
            />
        </div>
    );
}

export default Navbar;
