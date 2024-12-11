import CircularButton from "../../components/CircularButton/CircularButton";
import Dropdown from "../../components/Dropdown";
import styles from "./SocialMatchings.module.css";
import { useState, useEffect } from "react";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import axios from "axios";
import SocialMatchingNavbar from "../../components/SocialMatchingItem/SocialMatchingNavbar";
import SocialMatching from "../../components/SocialMatchingItem/SocialMatching";
import { sortObjectContents } from "../../utils/sortContents";
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
    const [allData, setAllData] = useState([]);
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

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, filteredData.length));
    };

    // 정렬된 데이터 상태 업데이트
    useEffect(() => {
        if (allData.length > 0) {
            const sortedData = sortObjectContents([...allData], selectedOption); // 정렬된 데이터
            setSortedContents(sortedData); // 정렬 결과 저장
        }
    }, [allData, selectedOption]);


    // 필터링
    const [filteredData, setFilteredData] = useState([]);  // 필터링된 데이터 상태

    const filterCriteria = JSON.parse(localStorage.getItem('TotalSet'));

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
                            loc: stadium.AREANM || "",
                            x: stadium.X || "",
                            y: stadium.Y || "",
                        },
                    };
                });
                setAllData(updatedList);  // 모든 데이터를 저장
            })
            .catch((error) => {
                console.error("데이터 로딩 실패:", error);
            });
    }, []);

    // 필터링된 데이터만 출력하는 함수
    const applyFilters = () => {

        if (!filterCriteria) return;
        console.log('Filter Criteria:', filterCriteria);
        
        // 필터링된 리스트 생성
        const filteredList = sortedContents.filter((item) => {
            const { social, stadium } = item;
            
            // 각 조건을 체크하는 부분에서 로그를 찍어봄
            const genderMatch = filterCriteria.gender.includes(social.socialGender);
            console.log('Gender Match:', genderMatch, social.socialGender);
            
            const locationMatch = stadium.loc.includes(filterCriteria.locDetail);
            console.log('Location Match:', locationMatch, stadium.loc, filterCriteria.locDetail);
            
            const socialDate = new Date(social.socialTime);  // 소셜매칭의 날짜
            const startDate = new Date(filterCriteria.matchingDate.start);
            const endDate = new Date(filterCriteria.matchingDate.end);
            const dateMatch = socialDate >= startDate && socialDate <= endDate;
            console.log('Date Match:', dateMatch, socialDate, startDate, endDate);
            
            const teamSizeMatch = filterCriteria.teamSize.includes(social.socialSize);
            console.log('Team Size Match:', teamSizeMatch, social.socialSize);
            
            // 모든 조건이 맞으면 true 반환
            return genderMatch && locationMatch && dateMatch && teamSizeMatch;
        });
    
        console.log('Filtered List:', filteredList);
    
        // 필터링된 데이터 상태 업데이트
        setFilteredData(filteredList);  // 필터링된 데이터 상태도 저장
    
        // 필터링된 데이터 정렬
        const sortedFilteredData = sortObjectContents([...filteredList], selectedOption);
        setSortedContents(sortedFilteredData);  // 정렬된 결과를 저장
    };


    return (
        <div style={{ gridArea: gridArea }} className={styles['social-wrapper-grid']}>
            <SocialMatchingNavbar
                gridArea="nav"
                filteredData={filteredData}
                onSearchButtonClick={applyFilters}  // 네비바에서 버튼 클릭 시 필터링 적용

            />

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
                    {sortedContents.length > 0 ? (
                        sortedContents.slice(0, visibleCount).map((content, index) => (
                            <div key={index}>
                                <SocialMatching
                                    content={content}
                                    openModal={() => openModal(content)}
                                />

                            </div>
                        ))
                    ) : (
                        <p>No matching data found</p>
                    )}
                </div>

                {/* 더 보기 버튼 */}
                <CircularButton onClick={handleLoadMore} gridArea="btn" />

                {isModalOpen && (
                    <MatchingPayment
                        isOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        userCash={user.userCash}
                        stadiumCost={stadiumCost}
                        to="/"
                    />
                )}
            </div>
        </div>
    );
}

export default SocialMatchings;
