import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./GuestRecruitment.module.css"
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useStore } from "../../stores/CollectionStore/useStore";

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

    //useEffect
    // 초기 및 옵션 변경 시 정렬 실행
    useEffect(() => {
        // selectedOption이나 state가 변경될 때마다 정렬
        const sorted = sortContents(state, selectedOption);
        setSortedContents(sorted); // option 변경될 때마다 업데이트
    }, [state, selectedOption])

    // activeStatus 변경 감지 및 처리
    useEffect(() => {
        if (state.currentMember / state.totalMember === 1) {
            actions.changeActiveStatus("true");
        }
    }, [state.currentMember, state.totalMember, actions]);

    return (
        <div className={styles['guestrecruitment-grid']}>
            {/* 새글작성 버튼의 경우에는 팀 리더일 경우만 렌더링될 수 있게 추후에 고쳐야함 !!!!! */}
            <Button gridArea="btn2" color="#606060" size="large">새 글 작성</Button>
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