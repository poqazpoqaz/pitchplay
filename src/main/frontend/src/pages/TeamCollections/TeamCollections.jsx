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
    const { isFiltered, filterCriteria } = useOutletContext();  // 필터링 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [sortedContents, setSortedContents] = useState([]);  // 정렬된 데이터
    const [filteredContents, setFilteredContents] = useState([]);  // 필터링된 데이터
    const [selectedOption, setSelectedOption] = useState("최신순");  // 드롭다운
    const [visibleCount, setVisibleCount] = useState(5);  // 현재 렌더링할 데이터 개수

    // 알람 열기/닫기 함수
    const openAlarm = () => {
        setIsAlarmOpen(true);
        setIsModalOpen(false);
    };

    const closeAlarm = () => setIsAlarmOpen(false);

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option);  // 선택된 옵션 업데이트
    };

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, filteredContents.length));  // 필터링된 내용에 맞춰 더 보기
    };

    // 데이터 가져오기
    useEffect(() => {
        axios.get("/data/collectionsData.json")
            .then(response => {
                const datas = response.data;
                setSortedContents(datas);  // 전체 데이터 설정
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, []);  // 초기 로드

    // 필터링 및 정렬 적용
    useEffect(() => {
        let updatedData = [...sortedContents];

        // 필터링 조건이 있을 경우 필터링 적용
        if (isFiltered && filterCriteria) {
            updatedData = updatedData.filter((item) => {
                const conditions = [];

                // 성별 필터링
                if (filterCriteria.gender && filterCriteria.gender.length > 0) {
                    conditions.push(filterCriteria.gender.includes(item.gender));
                }

                // 지역 필터링 (locDetail 사용)
                if (filterCriteria.locDetail && filterCriteria.locDetail.trim() !== "") {
                    conditions.push(item.location.includes(filterCriteria.locDetail));
                }

                // 날짜 필터링
                if (
                    filterCriteria.matchingDate &&
                    filterCriteria.matchingDate.start &&
                    filterCriteria.matchingDate.end
                ) {
                    const matchingDate = new Date(item.matchingDate);
                    const startDate = new Date(filterCriteria.matchingDate.start);
                    const endDate = new Date(filterCriteria.matchingDate.end);
                    conditions.push(matchingDate >= startDate && matchingDate <= endDate);
                }

                return conditions.some(Boolean);  // 하나라도 조건 만족 시 true
            });
        }

        // 정렬 적용
        const sortedData = sortContents(updatedData, selectedOption);
        setFilteredContents(sortedData);  // 필터링 및 정렬된 데이터 설정
    }, [isFiltered, filterCriteria, sortedContents, selectedOption]);  // 의존성 배열: 필터링 상태, 필터링 조건, 정렬 옵션 변경 시 실행

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
                {/* 필터링된 데이터 렌더링 */}
                {filteredContents.slice(0, visibleCount).map((content, index) => {
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

            {/* 가입 신청 모달 */}
            {isModalOpen &&
                <JoinRequestModal titletext="가입신청" buttontext="가입신청하기" isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} openAlarm={openAlarm}>
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>
            }

            {/* 알람 모달 */}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>가입신청이 완료되었습니다.</Alarm>}
        </div>
    );
}

export default TeamCollections;
