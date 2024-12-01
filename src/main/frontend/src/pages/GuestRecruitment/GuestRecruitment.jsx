import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./GuestRecruitment.module.css"
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";
import { useStore as StadiumStore } from "../../stores/StadiumStore/useStore";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Checkbox from "../../components/Checkbox/Checkbox";

function GuestRecruitment() {
    const { state: collectionState, actions: collectionActions } = CollectionStore();
    const { state: userState, actions: userActions } = UserStore();
    const { state: reservationState, actions: reservationActions } = ReservationStore();
    const { state: teamState, actions: teamActions } = TeamStore();
    const { state: stadiumState, actions: stadiumActions } = StadiumStore();

    const [reservationList, setReservationList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(0);

    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const data = response.data[0]; // 데이터 배열의 첫 번째 요소를 가져옴

                // 각 필드에 대한 액션 호출
                userActions.changeUserNumber(data.userNumber);
                userActions.changeName(data.name);
                userActions.changeProfileImg(data.profileImg);
                userActions.changeBirthday(data.birthday);
                userActions.changeEmail(data.email);
                userActions.changePhone(data.phone);
                userActions.changeId(data.id);
                userActions.changeNickname(data.nickname);
                userActions.changePassword(data.password);
                userActions.changeFavoriteCity(data.favoriteCity);
                userActions.changeFavoriteTime(data.favoriteTime);
                userActions.changeMyTeam(data.myTeam);
                userActions.changeMyDescription(data.myDescription);
                userActions.changeUserCash(data.userCash);
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

    const handleReservationClick = async () => {
        try {
            // 팀 정보 가져오기
            const teamResponse = await axios.get("/data/teamData.json");
            const teamData = teamResponse.data.find(data => data.teamName === userState.myTeam);
            if (teamData) {
                teamActions.changeTeamCode(teamData.teamCode);
            }

            // 예약 정보 가져오기
            const reservationResponse = await axios.get("/data/reservationData.json");
            const reservations = reservationResponse.data.filter(reservation => reservation.teamCode === teamData.teamCode);

            // 예약 데이터와 경기장 데이터 결합
            const stadiumResponse = await axios.get("/data/stadiumData.json");
            const stadiums = stadiumResponse.data;

            // 결합 데이터 생성
            const combinedData = reservations.map(reservation => {
                const stadium = stadiums.find(st => st.SVCID === reservation.stadiumId);
                return {
                    reservationNumber: reservation.reservationNumber,
                    reservationDate: reservation.reservationDate,
                    stadium: stadium ? stadium.SVCNM : "Unknown Stadium",
                };
            });

            // 상태 업데이트
            setReservationList(combinedData);
            setIsModalOpen(true);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

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

    // 날짜 포맷팅 함수
    const formatReservationDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}. ${month}. ${day}`;
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
                    collectionActions.changeTeamCode(data.teamCode);
                    collectionActions.changeCollectionDescription(data.collectionDescription);
                    collectionActions.changeCollectionTime(data.collectionTime);
                    collectionActions.changeCurrentMember(data.currentMember);
                    collectionActions.changeTotalMember(data.totalMember);
                    collectionActions.changeTeamName(data.teamName);
                    collectionActions.changeTeamImg(data.teamImg);
                    collectionActions.changeTeamCity(data.teamCity);
                    collectionActions.changeTeamLoc(data.teamLoc);
                    collectionActions.changeTeamGender(data.teamGender);
                    collectionActions.changeViewCount(data.viewCount);
                    collectionActions.changeActiveStatus(data.activeStatus);
                    collectionActions.changeWrittenDate(data.writtenDate);
                    collectionActions.changeTeamSize(data.teamSize);
                    collectionActions.changeStadium(data.stadium);

                    // currentMember와 totalMember 비교 후 activeStatus 업데이트
                    if (data.currentMember / data.totalMember === 1) {
                        collectionActions.changeActiveStatus("true");
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
            <Button gridArea="btn2" color="#606060" size="large" onClick={handleReservationClick}>새 글 작성</Button>

            {isModalOpen &&
                <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                    {reservationList.map((data, index) =>
                        <Checkbox
                            key={index}
                            isChecked={isSelected == index}
                            onClick={() => setIsSelected(index)}
                        >
                            {formatReservationDate(data.reservationDate)} - {data.stadium}
                        </Checkbox>
                    )}
                    <Button color="var(--main-color)" to={`/${reservationList[isSelected].reservationNumber}/newguest`}>확인</Button>
                </Modal>}
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