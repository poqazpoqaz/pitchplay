import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./SocialMatchings.module.css";
import { useState, useEffect } from "react";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import axios from "axios";
import SocialMatchingNavbar from "../../components/SocialMatchingItem/SocialMatchingNavbar";
import SocialMatching from "../../components/SocialMatchingItem/SocialMatching";
import { sortObjectContents } from "../../utils/sortContents"
import { DROPDOWN_OPTIONS } from "../../utils/constants";
import MatchingPayment from "../../components/MatchingPayment";

function SocialMatchings({ gridArea }) {
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 user가져옴
    const { state: userState, actions: userActions } = UserStore(); // 유저 캐시 변경되기 때문에 스토어 사용
    const [stadiumCost, setStadiumCost] = useState(0);  // 경기장 가격 
    const [socialSize, setSocialSize] = useState(""); // 소셜매칭 teamSize 

    // 드롭다운 옵션
    const [selectedOption, setSelectedOption] = useState("최신순");

    // 데이터 저장 
    const [dataList, setDataList] = useState([]);
    const [sortedContents, setSortedContents] = useState([]);

    // 현재 렌더링할 데이터 개수
    const [visibleCount, setVisibleCount] = useState(5);

    // 모달 오픈
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기/닫기 함수
    const openModal = (content) => {
        if (!user) {
            // 로그인되어 있지 않으면 로그인 페이지로 이동
            window.location.href = "/login"; // 로그인 페이지 경로를 설정하세요.
            return;
        }
        setIsModalOpen(true);
        setStadiumCost(content.stadium.cost);
        setSocialSize(content.social.socialSize);
    };

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    // 유저 데이터 불러오기 (소셜매칭신청할때 캐시)
    // 유저 데이터 불러오기 (소셜매칭 신청할 때 캐시)
    useEffect(() => {
        if (!user) {
            console.log("로그인하지 않은 사용자입니다.");
            // 사용자 정보가 없는 경우, 필요한 처리를 여기서 할 수 있습니다.
        } else {
            axios.get("/data/userData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedUser = datas.find(data => data.userNumber === user.userNumber);

                    if (selectedUser) {
                        userActions.updateAllFields(selectedUser);
                    } else {
                        console.log("로그인이 되어있지 않습니다.");
                    }
                })
        }
    }, []);

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
                    // 소셜매칭에 포함되어있는 userId에 해당하는 사용자 정보 찾기
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
            const sortedData = sortObjectContents([...dataList], selectedOption); // 정렬된 데이터
            setSortedContents(sortedData); // 정렬 결과 저장
        }
    }, [dataList, selectedOption]);

    // stadium socialSize에 따라 divison 변경
    let divisor = 1;
    if (stadiumCost) {
        switch (socialSize) {
            case '4vs4':
                divisor = 8;
                break;
            case '5vs5':
                divisor = 10;
                break;
            case '6vs6':
                divisor = 12;
                break;
            case '7vs7':
                divisor = 14;
                break;
            case '11vs11':
                divisor = 22;
                break;
            default:
                divisor = 1; // 기본값 설정
                break;
        }
    }
    // stadiumCost를 divisor로 나누기
    const adjustedStadiumCost = Math.round(+stadiumCost / divisor / 100) * 100;


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
                    options={DROPDOWN_OPTIONS}
                    selected={selectedOption}
                    onChange={handleSelectChange}
                    text="정렬기준"
                    gridArea="drop"
                />
                <div className={styles["socialMathings-items"]}>
                    {/* 정렬된 내용에서 visibleCount만큼만 표시 */}
                    {sortedContents.slice(0, visibleCount).map((content, index) => (
                        <div>
                            <SocialMatching
                                key={index}
                                content={content}
                                openModal={() => openModal(content)}
                            />
                        </div>
                    ))}
                </div>
                {/* 더 보기 버튼 */}
                <CircularButton onClick={handleLoadMore} gridArea="btn" />

                {isModalOpen && (
                    <MatchingPayment
                        isOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        userCash={userState.userCash}
                        stadiumCost={adjustedStadiumCost}
                        to="/"
                    />
                )}
            </div>
        </div>
    );
}

export default SocialMatchings;