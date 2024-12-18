import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TeamCollection from "../../components/TeamCollection/TeamCollection";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamCollections.module.css";
import JoinRequestModal from "../../components/JoinRequestModal";
import Alarm from "../../components/Alarm";
import axios from "axios";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function TeamCollections() {
    const { isFiltered, filterCriteria } = useOutletContext(); // 필터링 상태와 조건
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [allData, setAllData] = useState([]); // 전체 데이터
    const [filteredContents, setFilteredContents] = useState([]); // 필터링된 데이터
    const [selectedOption, setSelectedOption] = useState("최신순"); // 드롭다운 선택 옵션
    const [visibleCount, setVisibleCount] = useState(5); // 표시할 데이터 개수

    // 알람 열기/닫기 함수
    const openAlarm = () => {
        setIsAlarmOpen(true);
        setIsModalOpen(false);
    };

    const closeAlarm = () => setIsAlarmOpen(false);

    // 사용자 정보 가져오기
    const [user, setUser] = useState(null);

    // 사용자 정보를 localStorage에서 한번만 읽어옴
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    // 팀에 이미 가입되어 있는지 확인하고 알람 표시
    useEffect(() => {
        if (user && user.myTeam && user.myTeam.trim() !== "") {
            alert("이미 팀에 가입되어있습니다.");
        }
    }, [user]);

    // 데이터 가져오기
    useEffect(() => {
        axios.get("/data/collectionsData.json")
            .then(response => {
                const datas = response.data;
                setAllData(datas); // 전체 데이터 설정
                setFilteredContents(sortContents(datas, selectedOption)); // 초기 정렬
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, []);

    // 필터링 및 정렬 적용
    useEffect(() => {
        let updatedData = [...allData];

        if (isFiltered && filterCriteria) {
            updatedData = updatedData.filter((item) => {
                const conditions = [];

                // 성별 필터링
                if (filterCriteria.gender && filterCriteria.gender.length > 0) {
                    const genderMatch = filterCriteria.gender.some((gender) =>
                        item.teamGender.includes(gender)
                    );
                    conditions.push(genderMatch);
                }

                // 지역 필터링 (locDetail 사용)
                if (filterCriteria.locDetail) {
                    const locDetailMatch = item.teamLoc.includes(filterCriteria.locDetail);
                    conditions.push(locDetailMatch);
                }

                return conditions.every(Boolean); // 하나라도 조건 만족 시 true
            });
        }

        // 정렬 적용
        const sortedData = sortContents(updatedData, selectedOption);
        setFilteredContents(sortedData); // 필터링 및 정렬된 데이터 설정
    }, [isFiltered, filterCriteria, allData, selectedOption]);

    // 더 보기 버튼 클릭
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, filteredContents.length));
    };

    // 가입 신청 모달을 열기 전에 팀에 가입된 상태인지 확인
    const openJoinRequestModal = () => {
        if (user && user.myTeam && user.myTeam.trim() !== "") {
            alert("이미 팀에 가입되어있습니다.");
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className={styles['teamcollections-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={setSelectedOption}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles["teamcollections-items"]}>
                {/* 필터링된 데이터 렌더링 */}
                {filteredContents.slice(0, visibleCount).map((content, index) => {
                    return (
                        <TeamCollection
                            key={index}
                            content={content}
                            openModal={openJoinRequestModal} // 기존 openModal 대신 openJoinRequestModal 사용
                            openAlarm={openAlarm}
                        />
                    );
                })}
            </div>

            {/* 더 보기 버튼 */}
            <CircularButton onClick={handleLoadMore} gridArea="btn" />

            {/* 가입 신청 모달 */}
            {isModalOpen && (
                <JoinRequestModal titletext="가입신청" buttontext="가입신청하기" isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} openAlarm={openAlarm}>
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>
            )}

            {/* 알람 모달 */}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>가입신청이 완료되었습니다.</Alarm>}
        </div>
    );
}

export default TeamCollections;
