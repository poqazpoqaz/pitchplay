import TeamMatching from "../../components/TeamMatching/TeamMatching";
import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./TeamMatchings.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function TeamMatchings() {

    const {state,setState} = useContext(MyContext);
    
    const [selectedOption, setSelectedOption] = useState("최신순");

    // 정렬된 데이터
    const [sortedContents, setSortedContents] = useState([]);

    // 현재 렌더링할 데이터 개수
    const [visibleCount, setVisibleCount] = useState(5);

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    const [filteredData, setFilteredData] = useState([]); 

    // 필터 적용
    const applyFilters = (data) => {
        const filterCriteria = JSON.parse(localStorage.getItem('TotalSet')); // 로컬 스토리지에서 필터 조건 가져오기
    
        if (!filterCriteria) return data; // 필터 조건이 없으면 원본 데이터를 그대로 리턴
    
        console.log('Filter Criteria:', filterCriteria);
    
        return data.filter((item) => {
            const { stadium, social } = item;
            const conditions = [];
    
            // 지역 필터
            if (filterCriteria.locDetail) {
                const locationMatch = stadium.loc.includes(filterCriteria.locDetail);
                conditions.push(locationMatch); // 지역 필터 조건 추가
            }
    
            // 성별 필터
            if (filterCriteria.gender && filterCriteria.gender.length > 0) {
                const genderMatch = filterCriteria.gender.includes(social.socialGender);
                conditions.push(genderMatch); // 성별 필터 조건 추가
            }
    
            // 날짜 필터
            if (filterCriteria.matchingDate && filterCriteria.matchingDate.start && filterCriteria.matchingDate.end) {
                const socialDate = new Date(social.socialTime);
                const startDate = new Date(filterCriteria.matchingDate.start);
                const endDate = new Date(filterCriteria.matchingDate.end);
                const dateMatch = socialDate >= startDate && socialDate <= endDate;
                conditions.push(dateMatch); // 날짜 필터 조건 추가
            }
    
            // 조건이 모두 만족하는지 체크
            return conditions.every(Boolean); // 모든 조건이 true일 경우만 반환
        });
        setFilteredData(filteredList);
    };
    

    // 필터링된 데이터 상태 업데이트
    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        axios.get("/data/matchingData.json")
            .then(response => {
                const datas = response.data;
                // 필터를 적용하고, selectedOption에 따른 정렬 수행
                const filteredData = applyFilters(datas);
                const sortedData = sortContents(filteredData, selectedOption);
                setSortedContents(sortedData); // 업데이트된 정렬된 데이터를 상태로 설정
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [selectedOption, filteredData]); // selectedOption이나 filterCriteria가 변경될 때마다 실행

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
