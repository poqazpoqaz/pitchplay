import { useState, useEffect } from "react";
import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";

function TeamMatchings({ contents }) {
    const options = ["최신순", "오래된순"]; // 드롭다운 옵션
    const [selectedOption, setSelectedOption] = useState("최신순"); // 초기값 설정
    const [sortedContents, setSortedContents] = useState([]); // 정렬된 데이터 상태
    const [visibleCount, setVisibleCount] = useState(5); // 현재 렌더링할 데이터 개수

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
        sortContents(option); // 데이터 정렬
    };

    // 정렬 로직
    const sortContents = (option) => {
        const sorted = [...contents].sort((a, b) => {
            if (option === "최신순") {
                return new Date(b.date) - new Date(a.date); // 최신순 정렬 (날짜 내림차순)
            } else if (option === "오래된순") {
                return new Date(a.date) - new Date(b.date); // 오래된순 정렬 (날짜 오름차순)
            }
            return 0;
        });
        setSortedContents(sorted); // 정렬 결과 업데이트
    };

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    // 컴포넌트 마운트 후 정렬 실행
    useEffect(() => {
        sortContents(selectedOption); // 페이지 로드 시 기본값으로 정렬
    }, [contents, selectedOption]);

    return (
        <div className={styles['teamMatching-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={options}
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

// 사용한 데이터 예시
// const teamMatchingData = [
//     {
//         team1: "Team Alpha",
//         team1src: "/imgs/1.jpg",
//         team2: "Team Bravo",
//         team2src: "/imgs/team.jpg",
//         date: "2024-11-25",
//         location: "수원 HK 풋살파크",
//         gender: "Mixed",
//         level: "Intermediate",
//         views: "120",
//     },
//     {
//         team1: "Red Dragons",
//         team1src: "/imgs/1.jpg",
//         team2: "Blue Phoenix",
//         team2src: "/imgs/team.jpg",
//         date: "2024-12-01",
//         location: "Busan, South Korea",
//         gender: "Male",
//         level: "Advanced",
//         views: "200",
//     },
//     {
//         team1: "Golden Tigers",
//         team1src: "/imgs/1.jpg",
//         team2: null, // 팀이 아직 미정
//         team2src: null,
//         date: "2024-12-05",
//         location: "가산디지털운동장",
//         gender: "Female",
//         level: "Beginner",
//         views: "85",
//     },
//     {
//         team1: "Silver Wolves",
//         team1src: "/imgs/1.jpg",
//         team2: "Black Panthers",
//         team2src: "/imgs/team.jpg",
//         date: "2024-12-10",
//         location: "Daegu, South Korea",
//         gender: "Mixed",
//         level: "Advanced",
//         views: "310",
//     },
//     {
//         team1: "Green Arrows",
//         team1src: "/imgs/1.jpg",
//         team2: null,
//         team2src: null,
//         date: "2024-12-15",
//         location: "Jeju, South Korea",
//         gender: "Male",
//         level: "Intermediate",
//         views: "50",
//     },
// ];