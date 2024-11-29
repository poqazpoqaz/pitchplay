import DefaultButton from "../DefaultButton";
import styles from "./FAQNavbar.module.css";
import SearchInput from "../SearchInput";
import { useState } from "react";

//// src 팀만들기 만들어지면 고치기!!!!!!!!!!!! 


function FAQNavbar({ gridArea }) {
    const [activeButton, setActiveButton] = useState("btn1");

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
                src="/notices"
            >공지사항</DefaultButton>
            <DefaultButton
                color='var(--main-color)'
                gridArea="btn2"
                size="xlarge"
                isActive={activeButton === 'btn2'}
                onClick={() => handleButtonClick('btn2')}
                src="/notices/faq"
            >자주하는 질문</DefaultButton>
            <DefaultButton
                color='var(--main-color)'
                gridArea="btn3"
                size="xlarge"
                isActive={activeButton === 'btn3'}
                onClick={() => handleButtonClick('btn3')}
                src="/notices/feedback"
            >건의/제보</DefaultButton>

            <DefaultButton
                color='var(--main-color)'
                gridArea="btn4"
                size="xlarge"
                isActive={activeButton === 'btn4'}
                onClick={() => handleButtonClick('btn4')}
                src="/notices/conduct"
            >매너/제재</DefaultButton>

            <SearchInput gridArea="search" size="large" placeholder="검색할 단어를 작성해주세요." />
        </div>
    )
}

export default FAQNavbar;
