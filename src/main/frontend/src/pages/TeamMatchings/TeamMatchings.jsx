import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import { useState, useEffect } from "react";
import { useStore } from "../../stores/TeamMachingStore/useStore";

function TeamMatchings() {
    const { state, actions } = useStore();

    const dropdownoption = ["최신순", "오래된순"]; // 드롭다운 옵션
    const [selectedOption, setSelectedOption] = useState("최신순"); // 초기값 설정
    const [sortedContents, setSortedContents] = useState([]); // 정렬된 데이터 상태
    const [visibleCount, setVisibleCount] = useState(5); // 현재 렌더링할 데이터 개수

    // 정렬하는 함수
    const sortContents = (data, option) => {
        return [...data].sort((a, b) => {
            if (option == "최신순") {
                return new Date(b.date) - new Date(a.date); // 날짜 내림차순
            } else if (option == "오래된순") {
                return new Date(a.date) - new Date(b.date); // 날짜 오름차순
            }
            return 0;
        })
    }

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
        const sorted = sortContents(state, option);
        setSortedContents(sorted); // 데이터 정렬
    };

    // 초기 및 옵션 변경 시 정렬 실행
    useEffect(() => {
        const sorted = sortContents(state, selectedOption);
        setSortedContents(sorted); // option 변경될 때마다 업데이트
    }, [state, selectedOption]);

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };



    return (
        <div className={styles['teamMatching-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={dropdownoption}
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
