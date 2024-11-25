import { useState } from "react";
import TeamCollection from "../../components/TeamCollection/TeamCollection";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./TeamCollections.module.css";

function TeamCollections({ contents }) {
    const options = ["최신순", "오래된순"]; // 드롭다운 옵션
    const [selectedOption, setSelectedOption] = useState("최신순"); // 초기값 설정
    const [sortedContents, setSortedContents] = useState(contents); // 정렬된 데이터 상태
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
        setVisibleCount((prevCount) => Math.min(prevCount + 5, contents.length));
    };
    

    return (
        <div className={styles['teamcollections-grid']}>
            {/* 드롭다운 컴포넌트 */}
            <Dropdown
                options={options}
                selected={selectedOption}
                onChange={handleSelectChange}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles["teamcollections-items"]}>
                {/* 팀 데이터 렌더링 */}
                {sortedContents.slice(0, visibleCount).map((example, index) => {
                    const currentMembers = +example.currentMembers;
                    const totalMembers = +example.totalMembers;

                    return (
                        <TeamCollection
                            key={index}
                            src={example.src}
                            content={{
                                ...example,
                                currentMembers,
                                totalMembers,
                            }}
                        />
                    );
                })}
            </div>

            {/* 더 보기 버튼 */}
                <CircularButton onClick={handleLoadMore} gridArea="btn"/>
        </div>
    );
}

export default TeamCollections;

//사용한 데이터 예시!!!!
// const examples = [
//     {
//       "src": "/imgs/1.jpg",
//       "title": "KOSMO 팀원모집asdasdasdasdasdasdaadasdasdasdasdadsasadasdasdasasdasdasdsdasd",
//       "location": "경기도 안양시",
//       "currentMembers": "2",
//       "totalMembers": "23",
//       "gender": "남자",
//       "views": "207",
//       "date": "2023-11-20"
//     },
//     {
//       "src": "/imgs/2.jpg",
//       "title": "123123123 팀원모집",
//       "location": "서울특별시",
//       "currentMembers": "23",
//       "totalMembers": "23",
//       "gender": "여자",
//       "views": "220",
//       "date": "2023-11-18"
//     },
//     {
//       "src": "/imgs/3.jpg",
//       "title": "새로운 팀 모집",
//       "location": "부산광역시",
//       "currentMembers": "15",
//       "totalMembers": "20",
//       "gender": "남자",
//       "views": "150",
//       "date": "2023-11-15"
//     },
//     {
//       "src": "/imgs/4.jpg",
//       "title": "프로젝트 팀원 모집",
//       "location": "대구광역시",
//       "currentMembers": "15",
//       "totalMembers": "15",
//       "gender": "여자",
//       "views": "320",
//       "date": "2023-11-10"
//     },
//     {
//       "src": "/imgs/5.jpg",
//       "title": "코딩 팀원 모집",
//       "location": "인천광역시",
//       "currentMembers": "7",
//       "totalMembers": "10",
//       "gender": "남자",
//       "views": "100",
//       "date": "2023-11-08"
//     },
//     {
//       "src": "/imgs/6.jpg",
//       "title": "디자인 팀원 모집",
//       "location": "광주광역시",
//       "currentMembers": "5",
//       "totalMembers": "7",
//       "gender": "여자",
//       "views": "50",
//       "date": "2023-11-05"
//     },
//     {
//       "src": "/imgs/7.jpg",
//       "title": "스터디 그룹 모집",
//       "location": "대전광역시",
//       "currentMembers": "12",
//       "totalMembers": "12",
//       "gender": "남자",
//       "views": "180",
//       "date": "2023-11-03"
//     },
//     {
//       "src": "/imgs/8.jpg",
//       "title": "연구개발 팀원 모집",
//       "location": "경기도 성남시",
//       "currentMembers": "4",
//       "totalMembers": "10",
//       "gender": "여자",
//       "views": "90",
//       "date": "2023-11-01"
//     },
//     {
//       "src": "/imgs/9.jpg",
//       "title": "기술 지원 팀원 모집",
//       "location": "울산광역시",
//       "currentMembers": "6",
//       "totalMembers": "8",
//       "gender": "남자",
//       "views": "75",
//       "date": "2023-10-30"
//     },
//     {
//       "src": "/imgs/10.jpg",
//       "title": "웹 개발 팀 모집",
//       "location": "제주특별자치도",
//       "currentMembers": "3",
//       "totalMembers": "5",
//       "gender": "여자",
//       "views": "60",
//       "date": "2023-10-28"
//     }
//   ];