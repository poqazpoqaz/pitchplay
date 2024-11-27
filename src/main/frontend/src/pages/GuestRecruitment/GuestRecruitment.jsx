import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import { useState } from "react";
import styles from "./GuestRecruitment.module.css"
import Button from "../../components/Button";

function GuestRecruitment({ contents, gridArea }) {

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
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    return (
        <div className={styles['guestrecruitment-grid']}>
            {/* 새글작성 버튼의 경우에는 팀 리더일 경우만 렌더링될 수 있게 추후에 고쳐야함 !!!!! */}
            <Button gridArea="btn2" color="#606060" size="large">새 글 작성</Button>
            <Dropdown
                options={options}
                selected={selectedOption}
                onChange={handleSelectChange}
                text="정렬기준"
                gridArea="drop"
            />
            {/* sortedContents를 사용하여 정렬된 데이터를 렌더링 */}
            <div className={styles['guestrecruitment-items']}>
                {sortedContents.slice(0, visibleCount).map((content, index) => (
                    <GuestPlayerRecruitment
                        key={index}
                        content={content}
                    />
                ))}
            </div>
            {/* 더 보기 버튼 */}
            <CircularButton onClick={handleLoadMore} gridArea="btn" />
        </div>
    )
}

export default GuestRecruitment;




// 사용한 예제 데이터
// const recruitmentData = [
//     {
//         "date": "2024-11-25T20:00:00",
//         "location": "서울 올림픽 공원",
//         "currentMembers": 5,
//         "totalMembers": 10,
//         "team": "A팀",
//         "gender": "남성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-11-26T20:00:00",
//         "location": "부산 해운대",
//         "currentMembers": 3,
//         "totalMembers": 7,
//         "team": "B팀",
//         "gender": "여성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-11-27T20:00:00",
//         "location": "대구 수성못",
//         "currentMembers": 4,
//         "totalMembers": 6,
//         "team": "C팀",
//         "gender": "남성",
//         "teamSize": "3v3",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-11-28T20:00:00",
//         "location": "광주 전남대학교",
//         "currentMembers": 2,
//         "totalMembers": 6,
//         "team": "D팀",
//         "gender": "여성",
//         "teamSize": "3v3",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-11-29T20:00:00",
//         "location": "인천 송도",
//         "currentMembers": 6,
//         "totalMembers": 10,
//         "team": "E팀",
//         "gender": "남성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-11-30T20:00:00",
//         "location": "서울 한강공원",
//         "currentMembers": 7,
//         "totalMembers": 7,
//         "team": "F팀",
//         "gender": "여성",
//         "teamSize": "7v7",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-12-01T20:00:00",
//         "location": "경기도 파주",
//         "currentMembers": 8,
//         "totalMembers": 10,
//         "team": "G팀",
//         "gender": "남성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-12-02T20:00:00",
//         "location": "대전 유성구",
//         "currentMembers": 3,
//         "totalMembers": 6,
//         "team": "H팀",
//         "gender": "여성",
//         "teamSize": "3v3",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-12-03T20:00:00",
//         "location": "울산 문수축구장",
//         "currentMembers": 4,
//         "totalMembers": 8,
//         "team": "I팀",
//         "gender": "남성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     },
//     {
//         "date": "2024-12-04T20:00:00",
//         "location": "강원도 원주",
//         "currentMembers": 5,
//         "totalMembers": 9,
//         "team": "J팀",
//         "gender": "여성",
//         "teamSize": "5v5",
//         "src": "/public/imgs/1.jpg"
//     }
//   ];