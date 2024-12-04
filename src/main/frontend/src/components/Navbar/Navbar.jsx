import DefaultButton from "../DefaultButton";
import styles from "./Navbar.module.css";
import SearchInput from "../SearchInput";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Navbar({ gridArea }) {
    const [activeButton, setActiveButton] = useState("btn1");
    const location = useLocation();  // 현재 URL 위치 정보 가져오기

    useEffect(() => {
        // 정확히 일치하는 경로에 맞는 버튼을 활성화
        if (location.pathname === "/team") {
            setActiveButton("btn1");
        } else if (location.pathname === "/team/member") {
            setActiveButton("btn2");
        } else if (location.pathname === "/team/guestplayer") {
            setActiveButton("btn3");
        } else if (location.pathname === "/team/creation") {
            setActiveButton("btn4");
        }
    }, [location]); // location이 바뀔 때마다 실행

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId); // 버튼 클릭 시 활성화된 버튼 ID를 설정
    };

    return (
        <div className={styles['navbar-grid']} style={{ gridArea: gridArea }}>
            <DefaultButton
                color='var(--main-color)'
                gridArea="btn1"
                size="xlarge"
                isActive={activeButton === 'btn1'}
                onClick={() => handleButtonClick('btn1')}
                src="/team"
            >팀 매칭</DefaultButton>
            <DefaultButton
                color='var(--main-color)'
                gridArea="btn2"
                size="xlarge"
                isActive={activeButton === 'btn2'}
                onClick={() => handleButtonClick('btn2')}
                src="/team/member"
            >팀원모집</DefaultButton>
            <DefaultButton
                color='var(--main-color)'
                gridArea="btn3"
                size="xlarge"
                isActive={activeButton === 'btn3'}
                onClick={() => handleButtonClick('btn3')}
                src="/team/guestplayer"
            >용병모집</DefaultButton>

            <DefaultButton
                color='var(--main-color)'
                gridArea="btn4"
                size="xlarge"
                isActive={activeButton === 'btn4'}
                onClick={() => handleButtonClick('btn4')}
                src="/team/creation"
            >팀만들기</DefaultButton>

            <SearchInput gridArea="search" size="large" placeholder="검색할 단어를 작성해주세요." />
        </div>
    )
}

export default Navbar;
