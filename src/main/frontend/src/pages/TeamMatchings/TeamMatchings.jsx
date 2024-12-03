import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function TeamMatchings() {
    const [selectedOption, setSelectedOption] = useState("최신순");

    //정렬된 데이터
    const [sortedContents, setSortedContents] = useState([]);

    // 현재 렌더링할 데이터 개수
    const [visibleCount, setVisibleCount] = useState(5);


    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        axios.get("/data/matchingData.json")
            .then(response => {
                const datas = response.data;
                // selectedOption이나 state가 변경될 때마다 정렬 실행
                const sorted = sortContents(datas, selectedOption);
                setSortedContents(sorted); // 업데이트된 정렬된 데이터를 상태로 설정
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [selectedOption]); // selectedOption 변경 시마다 실행


    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    return (
        <div className={styles['teamMatching-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={handleSelectChange}
                text="정렬기준"
                gridArea="drop"
            />

            <div className={styles["teamMatching-items"]}>
                {/* 정렬된 내용에서 visibleCount만큼만 표시 */}
                {sortedContents.slice(0, visibleCount).map((content, index) => (
                    <TeamMatching
                        key={index}
                        content={content}
                    />
                ))}
            </div>

            {/* 더 보기 버튼 */}
            <CircularButton onClick={handleLoadMore} gridArea="btn" />
        </div>
    );
}

export default TeamMatchings;
