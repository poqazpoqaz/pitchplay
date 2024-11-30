import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./GuestRecruitment.module.css"
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useStore } from "../../stores/CollectionStore/useStore";
import axios from "axios";

function GuestRecruitment() {
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

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    useEffect(() => {
        axios.get("/data/collectionsData.json")
            .then(response => {
                const datas = response.data;
        
                // selectedOption이나 state가 변경될 때마다 정렬
                const sorted = sortContents(datas, selectedOption);
                setSortedContents(sorted); // option 변경될 때마다 업데이트

                datas.forEach((data) => {
                    // 각 데이터 항목에 대해 액션을 dispatch
                    actions.changeTeamCode(data.teamCode);
                    actions.changeCollectionDescription(data.collectionDescription);
                    actions.changeCollectionTime(data.collectionTime);
                    actions.changeCurrentMember(data.currentMember);
                    actions.changeTotalMember(data.totalMember);
                    actions.changeTeamName(data.teamName);
                    actions.changeTeamImg(data.teamImg);
                    actions.changeTeamCity(data.teamCity);
                    actions.changeTeamLoc(data.teamLoc);
                    actions.changeTeamGender(data.teamGender);
                    actions.changeViewCount(data.viewCount);
                    actions.changeActiveStatus(data.activeStatus);
                    actions.changeWrittenDate(data.writtenDate);
                    actions.changeTeamSize(data.teamSize);
                    actions.changeStadium(data.stadium);

                    // currentMember와 totalMember 비교 후 activeStatus 업데이트
                    if (data.currentMember / data.totalMember === 1) {
                        actions.changeActiveStatus("true");
                    }
                });
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [selectedOption]); //selectedOption 변경 시마다 실행


    return (
        <div className={styles['guestrecruitment-grid']}>
            {/* 새글작성 버튼의 경우에는 팀 리더일 경우만 렌더링될 수 있게 추후에 고쳐야함 !!!!! */}
            <Button gridArea="btn2" color="#606060" size="large" to={`/${state.teamCode}/guestnew`}>새 글 작성</Button>
            <Dropdown
                options={dropdownoption}
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