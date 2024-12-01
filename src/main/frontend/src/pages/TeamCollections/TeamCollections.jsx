import TeamCollection from "../../components/TeamCollection/TeamCollection";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./TeamCollections.module.css";
import JoinRequestModal from "../../components/JoinRequestModal";
import Alarm from "../../components/Alarm";
import { useState, useEffect } from "react";
import { useStore } from "../../stores/CollectionStore/useStore";
import axios from "axios";

function TeamCollections() {
    const { state, actions } = useStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [dataList, setDataList] = useState([]);

    // 모달 열기/닫기 함수
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 알람 열기/닫기 함수
    const openAlarm = () => {
        setIsAlarmOpen(true);
        setIsModalOpen(false);
    };
    const closeAlarm = () => setIsAlarmOpen(false);


    // 드롭다운 옵션
    const dropdownoption = ["최신순", "오래된순"];
    const [selectedOption, setSelectedOption] = useState("최신순");


    //정렬된 데이터
    const [sortedContents, setSortedContents] = useState([]);

    // 현재 렌더링할 데이터 개수
    const [visibleCount, setVisibleCount] = useState(5);

    // 정렬하는 함수
    const sortContents = (data, option) => {
        return [...data].sort((a, b) => {
            if (option === "최신순") {
                return new Date(b.writtenDate) - new Date(a.writtenDate); // 날짜 내림차순
            } else if (option === "오래된순") {
                return new Date(a.writtenDate) - new Date(b.writtenDate); // 날짜 오름차순
            }
            return 0;
        });
    };

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

                datas.forEach((data) => {
                    // 각 데이터 항목에 대해 액션을 dispatch
                    actions.changeTeamCode(data.teamCode);
                    actions.changeCollectionDescription(data.collectionDescription);
                    actions.changeCollectionTime(data.collectionTime);
                    actions.changeCurrentMember(data.currentMember);
                    actions.changeTotalMember(data.totalMember);
                    actions.changeTeamName(data.teamName);
                    actions.changeTeamImg(data.teamImg);
                    actions.changeTeamCity(data.teamCity);
                    actions.changeTeamLoc(data.teamLoc);
                    actions.changeTeamGender(data.teamGender);
                    actions.changeViewCount(data.viewCount);
                    actions.changeActiveStatus(data.activeStatus);
                    actions.changeWrittenDate(data.writtenDate);
                    actions.changeTeamSize(data.teamSize);
                    actions.changeStadium(data.stadium);

                    // currentMember와 totalMember 비교 후 activeStatus 업데이트
                    if (data.currentMember / data.totalMember === 1) {
                        actions.changeActiveStatus("true");
                    }

                    setDataList((prev) => [...prev, state]);
                });

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
                options={dropdownoption}
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
                            openModal={openModal}
                            openAlarm={openAlarm}
                        />
                    );
                })}
            </div>

            {/* 더 보기 버튼 */}
            <CircularButton onClick={handleLoadMore} gridArea="btn" />

            {isModalOpen &&
                <JoinRequestModal titletext="가입신청" buttontext="가입신청하기" isOpen={isModalOpen} closeModal={closeModal} openAlarm={openAlarm}>
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>가입신청이 완료되었습니다.</Alarm>}

        </div>
    );
}

export default TeamCollections;