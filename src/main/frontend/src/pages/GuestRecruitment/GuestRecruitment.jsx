import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./GuestRecruitment.module.css"
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Checkbox from "../../components/Checkbox/Checkbox";
import { formattedDate } from "../../utils/formattedDate";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";

function GuestRecruitment() {
    const { state: userState, actions: userActions } = UserStore();

    const [reservationList, setReservationList] = useState([]); // 새글작성 클릭 시 유저 팀 예약 데이터 목록
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(0);

    const [selectedOption, setSelectedOption] = useState("최신순");
    const [sortedContents, setSortedContents] = useState([]); //정렬된 데이터
    const [visibleCount, setVisibleCount] = useState(5);// 현재 렌더링할 데이터 개수

    // 드롭다운 선택 변경 처리
    const handleSelectChange = (option) => {
        setSelectedOption(option); // 선택된 옵션 업데이트
    };

    // 더 보기 버튼 클릭 처리
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, sortedContents.length));
    };

    // 렌더링할 데이터개수만큼 보임
    const visibleContents = sortedContents.slice(0, visibleCount);

    // 용병모집 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/collectionsData.json");
                const sorted = sortContents(response.data, selectedOption);
                setSortedContents(sorted);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchData();
    }, [selectedOption]);

    useEffect(() => {
        // localStorage에서 유저 정보 확인
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            window.location.href = "/login"; // 유저 정보가 없으면 로그인 페이지로 리디렉션
            return;
        }

        userActions.updateAllFields(user);
    }, []);

    // 새글작성 눌렀을 때 데이터
    const handleReservationClick = async () => {
        if (userState.myTeam) {
            try {
                const [teamResponse, reservationResponse, stadiumResponse] = await Promise.all([
                    axios.get("/data/teamData.json"),
                    axios.get("/data/reservationData.json"),
                    axios.get("/data/stadiumData.json"),
                ]);

                const teamData = teamResponse.data.find(data => data.teamName === userState.myTeam);
                const reservations = reservationResponse.data.filter(reservation => reservation.teamCode === teamData.teamCode);
                const stadiums = stadiumResponse.data;

                const combinedData = reservations.map(reservation => {
                    const stadium = stadiums.find(data => data.SVCID === reservation.stadiumId);
                    return {
                        reservationNumber: reservation.reservationNumber,
                        reservationDate: reservation.reservationDate,
                        stadium: stadium.SVCNM,
                    };
                });

                setReservationList(combinedData);
                setIsModalOpen(true);

            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        }
    };

    return (
        <div className={styles['guestrecruitment-grid']}>
            {userState.isTeamOwner &&
                <Button gridArea="btn2" color="#606060" size="large" onClick={handleReservationClick}>새 글 작성</Button>
            }
            {isModalOpen &&
                <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                    {reservationList.map((data, index) =>
                        <Checkbox
                            key={index}
                            isChecked={isSelected == index}
                            onClick={() => setIsSelected(index)}
                        >
                            {formattedDate(data.reservationDate)} - {data.stadium}
                        </Checkbox>
                    )}
                    <Button color="var(--main-color)" to={`/${reservationList[isSelected].reservationNumber}/newguest`}>확인</Button>
                </Modal>}
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={handleSelectChange}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles['guestrecruitment-items']}>
                {visibleContents.map((content, index) => (
                    <GuestPlayerRecruitment
                        key={index}
                        content={content}
                    />
                ))}
            </div>
            <CircularButton onClick={handleLoadMore} gridArea="btn" />
        </div>
    )
}
export default GuestRecruitment;