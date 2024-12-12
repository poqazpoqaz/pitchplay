import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import axios from "axios";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function TeamMatchings() {
    const { isFiltered, filterCriteria } = useOutletContext();
    const [selectedOption, setSelectedOption] = useState("최신순");
    const [allData, setAllData] = useState([]);
    const [sortedContents, setSortedContents] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    // 데이터 가져오기
    useEffect(() => {
        axios
            .get("/data/matchingData.json")
            .then((response) => {
                const datas = response.data;
                setAllData(datas);
                setSortedContents(sortContents(datas, selectedOption));
            })
            .catch((error) => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [selectedOption]);

    // 필터링 적용
    useEffect(() => {
        if (isFiltered && filterCriteria) {
            const filtered = allData.filter((item) => {
                const conditions = [];

                // 성별 필터링
                if (filterCriteria.gender && filterCriteria.gender.length > 0) {
                    conditions.push(filterCriteria.gender.includes(item.gender));
                }

                // 지역 필터링 (locDetail 사용)
                if (filterCriteria.locDetail && filterCriteria.locDetail.trim() !== "") {
                    conditions.push(item.locDetail.includes(filterCriteria.locDetail));
                }
                if (filterCriteria.matchingDate && filterCriteria.matchingDate.start && filterCriteria.matchingDate.end) {
                    const socialDate = new Date(item.matchingDate);
                    const startDate = new Date(filterCriteria.matchingDate.start);
                    const endDate = new Date(filterCriteria.matchingDate.end);                    
                    const dateMatch = socialDate >= startDate && socialDate <= endDate;
                    conditions.push(dateMatch); // 날짜 조건 추가
                }
                
                // 하나라도 조건이 만족하면 true 반환
                return conditions.some(Boolean);
            });

            setFilteredContents(filtered); // 필터링된 데이터 저장
        } else {
            setFilteredContents(sortedContents); // 필터링되지 않으면 정렬 데이터 유지
            

        }
    }, [isFiltered, filterCriteria, allData]);


    
    // 더 보기 버튼
    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + 5, isFiltered ? filteredContents.length : sortedContents.length)
        );
    };

    // 필터링된 데이터와 정렬된 데이터 결정
    const dataToRender = isFiltered ? filteredContents : sortedContents;

    return (
        <div className={styles["teamMatching-grid"]}>
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles["teamMatching-items"]}>
                {dataToRender.slice(0, visibleCount).map((content, index) => (
                    <TeamMatching key={index} content={content} />
                ))}
            </div>
            <CircularButton onClick={handleLoadMore} gridArea="btn" />
        </div>
    );
}

export default TeamMatchings;