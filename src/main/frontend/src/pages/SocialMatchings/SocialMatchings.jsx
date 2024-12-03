import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./SocialMatchings.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SocialMatchingNavbar from "../../components/SocialMatchingItem/SocialMatchingNavbar";
import SocialMatching from "../../components/SocialMatchingItem/SocialMatching";
import JoinRequestModal from "../../components/JoinRequestModal";
import Alarm from "../../components/Alarm";
import {sortObjectContnents} from "../../utils/sortContents"

function SocialMatchings({ gridArea }) {

    // 드롭다운 옵션
    const dropdownoption = ["최신순", "오래된순"];
    const [selectedOption, setSelectedOption] = useState("최신순");

    // 데이터 저장 
    const [dataList, setDataList] = useState([]);
    const [sortedContents, setSortedContents] = useState([]);

    // 현재 렌더링할 데이터 개수
    const [visibleCount, setVisibleCount] = useState(5);

    // 모달 오픈
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);


    // 모달 열기/닫기 함수
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 알람 열기/닫기 함수
    const openAlarm = () => {
        setIsAlarmOpen(true);
        setIsModalOpen(false);
    };
    const closeAlarm = () => setIsAlarmOpen(false);

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    useEffect(() => {
        // social, user, stadium 데이터 가져오기
        Promise.all([
            axios.get("/data/socialData.json"),
            axios.get("/data/userData.json"),
            axios.get("/data/stadiumData.json"),
        ])
            .then(([socialResponse, userResponse, stadiumResponse]) => {
                const socialDatas = socialResponse.data;
                const userDatas = userResponse.data;
                const stadiumDatas = stadiumResponse.data;

                // 사용자 데이터와 경기장 데이터를 매칭하여 새로운 데이터 리스트 생성
                const updatedList = socialDatas.map((data) => {
                    // userId에 해당하는 사용자 정보 찾기
                    const user = userDatas.find((u) => u.id === data.userId) || {};

                    // stadiumId에 해당하는 경기장 정보 찾기
                    const stadium = stadiumDatas.find((s) => s.SVCID === data.stadiumId) || {};

                    // 데이터 조합
                    return {
                        social: {
                            socialNumber: data.socialNumber,
                            userId: data.userId,
                            stadiumId: data.stadiumId,
                            socialGender: data.socialGender,
                            socialSize: data.socialSize,
                            socialLevel: data.socialLevel,
                            socialTime: data.socialTime,
                            writtenDate: data.writtenDate,
                            viewCount: data.viewCount,
                            activeStatus: data.activeStatus,
                            currentMember: data.currentMember,
                            totalMember: data.totalMember,
                        },
                        user: {
                            id: user.id || "",
                            profileImg: user.profileImg || "",
                            nickname: user.nickname || "",
                        },
                        stadium: {
                            id: stadium.SVCID || "",
                            name: stadium.SVCNM || "",
                            img: stadium.SVCURL || "",
                            cost: stadium.PAYATNM || "",
                            loc: stadium.PLACENM || "",
                            x: stadium.X || "",
                            y: stadium.Y || "",
                        },
                    };
                });

                // 상태에 저장
                setDataList(updatedList);
            })
            .catch((error) => {
                console.error("데이터 로딩 실패:", error);
            });
    }, []);



    // 정렬된 데이터 상태 업데이트
    useEffect(() => {
        if (dataList.length > 0) {
            const sortedData = sortObjectContnents([...dataList], selectedOption); // 정렬된 데이터
            setSortedContents(sortedData); // 정렬 결과 저장
        }
    }, [dataList, selectedOption]);

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };


    return (
        <div style={{ gridArea: gridArea }} className={styles['social-wrapper-grid']}>
            <SocialMatchingNavbar gridArea="nav" />
            <div className={styles['socialMathings-grid']}>
                {/* 드롭다운 컴포넌트 */}
                <Dropdown
                    options={dropdownoption}
                    selected={selectedOption}
                    onChange={handleSelectChange}
                    text="정렬기준"
                    gridArea="drop"
                />
                <div className={styles["socialMathings-items"]}>
                    {/* 정렬된 내용에서 visibleCount만큼만 표시 */}
                    {sortedContents.slice(0, visibleCount).map((content, index) => (
                        <SocialMatching
                            key={index}
                            content={content}
                            openModal={openModal}
                        />
                    ))}
                </div>
                {/* 더 보기 버튼 */}
                <CircularButton onClick={handleLoadMore} gridArea="btn" />

                {isModalOpen && <JoinRequestModal titletext="소셜매칭신청" buttontext="신청하기" isOpen={isModalOpen} closeModal={closeModal} openAlarm={openAlarm}>
                    <p>소셜 신청 시에 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>}
                {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>소셜매칭신청이 완료되었습니다.</Alarm>}
            </div>
        </div>
    );
}

export default SocialMatchings;
