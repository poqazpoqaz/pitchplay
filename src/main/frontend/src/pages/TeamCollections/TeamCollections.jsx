import TeamCollection from "../../components/TeamCollection/TeamCollection";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./TeamCollections.module.css";
import JoinRequestModal from "../../components/JoinRequestModal";
import Alarm from "../../components/Alarm";
import { useState, useEffect } from "react";
import axios from "axios";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function TeamCollections() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [sortedContents, setSortedContents] = useState([]);//정렬된 데이터    
    const [selectedOption, setSelectedOption] = useState("최신순");// 드롭다운
    const [visibleCount, setVisibleCount] = useState(5);// 현재 렌더링할 데이터 개수
   
    // 알람 열기/닫기 함수
    const openAlarm = () => {
        setIsAlarmOpen(true);
        setIsModalOpen(false);
    };

    const closeAlarm = () => setIsAlarmOpen(false);


    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    //useEffect
    useEffect(() => {
        axios.get("/data/collectionsData.json")
            .then(response => {
                const datas = response.data;
                // selectedOption이나 state가 변경될 때마다 정렬
                const sorted = sortContents(datas, selectedOption);
                setSortedContents(sorted); // option 변경될 때마다 업데이트
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });

    }, [selectedOption]); //selectedOption 변경 시마다 실행

    return (
        <div className={styles['teamcollections-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={handleSelectChange}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles["teamcollections-items"]}>
                {sortedContents.slice(0, visibleCount).map((content, index) => {
                    return (
                        <TeamCollection
                            key={index}
                            content={content}
                            openModal={() => setIsModalOpen(true)}
                            openAlarm={openAlarm}
                        />
                    );
                })}
            </div>

            {/* 더 보기 버튼 */}
            <CircularButton onClick={handleLoadMore} gridArea="btn" />

            {isModalOpen &&
                <JoinRequestModal titletext="가입신청" buttontext="가입신청하기" isOpen={isModalOpen} closeModal={()=>setIsModalOpen(false)} openAlarm={openAlarm}>
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>가입신청이 완료되었습니다.</Alarm>}

        </div>
    );
}

export default TeamCollections;