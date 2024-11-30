import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import { useState, useEffect } from "react";
import { useStore } from "../../stores/MatchingStore/useStore";
import axios from "axios";

function TeamMatchings() {
    const { state, actions } = useStore();

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

    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        axios.get("/data/matchingData.json")
            .then(response => {
                const datas = response.data;

                // selectedOption이나 state가 변경될 때마다 정렬 실행
                const sorted = sortContents(datas, selectedOption);
                setSortedContents(sorted); // 업데이트된 정렬된 데이터를 상태로 설정
                
                // 각각의 데이터에 대해 상태를 업데이트
                datas.forEach((data) => {
                    actions.changeMatchingNumber(data.matchingNum);

                    // team1 정보 업데이트
                    actions.changeTeamName("team1", data.teams.team1.name);
                    actions.changeTeamImg("team1", data.teams.team1.src);

                    // team2 정보 업데이트
                    actions.changeTeamName("team2", data.teams.team2.name || "N/A"); // 팀 이름이 null일 경우 기본값 설정
                    actions.changeTeamImg("team2", data.teams.team2.src || "N/A");

                    actions.changeMatchingDate(data.date);
                    actions.changeMatchingLoc(data.location);
                    actions.changeTeamGender(data.gender);
                    actions.changeTeamLevel(data.level);
                    actions.changeViewCount(data.views);
                    actions.changeWrittenDate(data.writtenDate);
                });
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
