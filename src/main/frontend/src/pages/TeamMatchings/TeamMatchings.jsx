import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import axios from "axios";
import { DROPDOWN_OPTIONS } from "../../utils/constants";
import { sortContents } from "../../utils/sortContents";

function TeamMatchings() {
    const { isFiltered, filterCriteria } = useOutletContext();
    const [selectedOption, setSelectedOption] = useState("최신순");
    const [allData, setAllData] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    // 데이터 가져오기
    useEffect(() => {
        axios
            .get("/data/matchingData.json")
            .then((response) => {
                const datas = response.data;
                setAllData(datas);
                setFilteredContents(sortContents(datas, selectedOption)); // 초기 정렬 적용
            })
            .catch((error) => {
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
                    conditions.push(filterCriteria.gender.includes(item.gender));
                }
    
                // 지역 필터링
                if (filterCriteria.locDetail && filterCriteria.locDetail.length > 0) {
                    conditions.push(filterCriteria.locDetail.includes(item.locDetail));
                }
    
                // 날짜 필터링
                if (
                    filterCriteria.matchingDate &&
                    filterCriteria.matchingDate.start &&
                    filterCriteria.matchingDate.end
                ) {
                    const matchingDate = new Date(item.matchingDate || "1970-01-01");
                    const startDate = new Date(filterCriteria.matchingDate.start);
                    const endDate = new Date(filterCriteria.matchingDate.end);
                    if (!isNaN(matchingDate)) {
                        conditions.push(matchingDate >= startDate && matchingDate <= endDate);
                    }
                }
    
                return conditions.every(Boolean); // 모든 조건이 참이어야 포함
            });
        }
    
        // 정렬 적용
        const sortedData = sortContents(updatedData, selectedOption);
        setFilteredContents(sortedData);
    }, [isFiltered, filterCriteria, allData, selectedOption]);

    // 더 보기 버튼
    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + 5, filteredContents.length)
        );
    };

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
                {filteredContents.slice(0, visibleCount).map((content, index) => (
                    <TeamMatching key={index} content={content} />
                ))}
            </div>
            <CircularButton onClick={handleLoadMore} gridArea="btn" />
        </div>
    );
}

export default TeamMatchings;
