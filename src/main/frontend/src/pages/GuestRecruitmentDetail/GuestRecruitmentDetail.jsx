import { useStore as StadiumStore } from "../../stores/StadiumStore/useStore";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";
import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useEffect, useState } from "react";
import Alarm from "../../components/Alarm";

import styles from "./GuestRecruitmentDetail.module.css";
import ReservationDetail from "../../containers/ReservationDetail/ReservationDetail";
import GuestRecruitmentPost from "../../containers/PostDetail/GuestRecruitmetnPost";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

function GuestRecruitmentDetail({ gridArea }) {
    const { postNumber } = useParams();

    const { state: collectionState, actions: collectionActions } = CollectionStore();
    const { state: stadiumState, actions: stadiumActions } = StadiumStore();
    const { state: teamState, actions: teamActions } = TeamStore();
    const { state: reservationState, actions: reservationActions } = ReservationStore();

    const [isFirstAlarmOpen, setFirstAlarmOpen] = useState(false); // 첫 번째 알람 상태
    const [isSecondAlarmOpen, setSecondAlarmOpen] = useState(false); // 두 번째 알람 상태


    // 예약 데이터 불러오기
    useEffect(() => {
        axios.get("/data/reservationData.json")
            .then(response => {
                const datas = response.data;
                const reservationData = datas.find(data => data.collectionNumber === postNumber);

                if (reservationData) {
                    reservationActions.changeCollectionNumber(reservationData.collectionNumber);
                    reservationActions.changeReservationDate(reservationData.reservationDate);
                    reservationActions.changeReservationNumber(reservationData.reservationNumber);
                    reservationActions.changeStadiumId(reservationData.stadiumId);
                    reservationActions.changeTeamCode(reservationData.teamCode);
                } else {
                    console.log("해당 예약을 찾을 수 없습니다.");
                }

            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [postNumber])


    // 모집 데이터 : teamCode에 해당하는 데이터
    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        if (reservationState.teamCode) {
            axios.get("/data/collectionsData.json")
                .then(response => {
                    const datas = response.data; // teamData.json의 데이터 가져오기
                    const collectionsData = datas.find(data => data.teamCode === reservationState.teamCode); // 해당 팀 찾기

                    if (collectionsData) {
                        // 팀 데이터를 상태에 설정
                        collectionActions.changeTeamCode(collectionsData.teamCode);
                        collectionActions.changeCollectionDescription(collectionsData.collectionDescription);
                        collectionActions.changeCollectionTime(collectionsData.collectionTime);
                        collectionActions.changeCurrentMember(collectionsData.currentMember);
                        collectionActions.changeTotalMember(collectionsData.totalMember);
                        collectionActions.changeTeamName(collectionsData.teamName);
                        collectionActions.changeTeamImg(collectionsData.teamImg);
                        collectionActions.changeTeamCity(collectionsData.teamCity);
                        collectionActions.changeTeamLoc(collectionsData.teamLoc);
                        collectionActions.changeTeamGender(collectionsData.teamGender);
                        collectionActions.changeViewCount(collectionsData.viewCount);
                        collectionActions.changeActiveStatus(collectionsData.activeStatus);
                        collectionActions.changeWrittenDate(collectionsData.writtenDate);
                        collectionActions.changeTeamSize(collectionsData.teamSize);
                        collectionActions.changeStadium(collectionsData.stadiumId);
                    } else {
                        console.error("해당 팀을 찾을 수 없습니다.");
                    }
                })
                .catch(error => {
                    console.error("데이터 로딩 실패:", error);
                });
        }
    }, [reservationState.teamCode]);

    // 팀 데이터 : teamNumber에 해당하는 데이터
    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        axios.get("/data/teamData.json")
            .then(response => {
                const datas = response.data; // teamData.json의 데이터 가져오기
                const teamData = datas.find(data => data.teamCode === reservationState.teamCode); // 해당 팀 찾기

                if (teamData) {
                    // 팀 데이터를 상태에 설정
                    teamActions.changeTeamName(teamData.teamName);
                    teamActions.changeTeamCode(teamData.teamCode);
                    teamActions.changeTeamImg(teamData.teamImg);
                    teamActions.changeTeamDescription(teamData.teamDescription);
                    teamActions.changeTeamLevel(teamData.teamLevel);
                    teamActions.changeTeamDay(teamData.teamDay);
                    teamActions.changeTeamTime(teamData.teamTime);
                    teamActions.changeTeamCity(teamData.teamCity);
                    teamActions.changeTeamLoc(teamData.teamLoc);
                    teamActions.changeTeamAge(teamData.teamAge);
                    teamActions.changeTeamGender(teamData.teamGender);
                    teamActions.changeCurrentMember(teamData.currentMember);
                    teamActions.changeTotalMember(teamData.totalMember);
                }
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [reservationState.teamCode]);


    // 구장데이터불러오기 
    useEffect(() => {
        if (reservationState.stadiumId) {
            axios.get("/data/stadiumData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedStadium = datas.find(stadium => stadium.SVCID === reservationState.stadiumId);
                    stadiumActions.changeStadiumName(selectedStadium.SVCNM);
                    stadiumActions.changeStadiumImg(selectedStadium.IMGURL)
                    stadiumActions.changeStadiumAddress(selectedStadium.PLACENM);
                    stadiumActions.changeStadiumDescription(selectedStadium.DTLCONT);
                    stadiumActions.changeStadiumX(selectedStadium.X);
                    stadiumActions.changeStadiumY(selectedStadium.Y);
                    stadiumActions.changeStadiumCost(selectedStadium.PAYATNM);
                    stadiumActions.changeStadiumVmin(selectedStadium.V_MIN);
                    stadiumActions.changeStadiumVmax(selectedStadium.V_MAX);
                })
                .catch(error => console.error('Error loading stadium data:', error));
        }
    }, [reservationState.stadiumId]);



    // "지원하기" 버튼 클릭 시 첫 번째 알람 표시
    const handleApplyClick = () => {
        setFirstAlarmOpen(true);
    };

    // 첫 번째 알람에서 확인 버튼 클릭 시
    const handleFirstAlarmConfirm = () => {
        setFirstAlarmOpen(false);
        setSecondAlarmOpen(true); // 두 번째 알람 표시
    };

    // 두 번째 알람에서 확인 버튼 클릭 시
    const handleSecondAlarmConfirm = () => {
        setSecondAlarmOpen(false);
    };

    return (
        <div className={styles['recruitment-detail-grid']} style={{ gridArea: gridArea }}>
            <img src={stadiumState.stadiumImg} />
            <GuestRecruitmentPost
                stadiumContent={stadiumState}
                teamContent={teamState}
                collectionContent={collectionState}
                gridArea="team" />
            <div style={{ gridArea: "reservation" }}>
                <ReservationDetail
                    reservationContent={reservationState}
                    stadiumContent={stadiumState} />
                <Button gridArea="btn" color="var(--main-color)" size="xlarge" onClick={handleApplyClick}>지원하기</Button>
            </div>


            {/* 첫 번째 알람 */}
            <Alarm
                isOpen={isFirstAlarmOpen}
                closeAlarm={() => setFirstAlarmOpen(false)}
                btntext="확인"
                onClick={handleFirstAlarmConfirm}
            >
                지원하시겠습니까?
            </Alarm>

            {/* 두 번째 알람 */}
            <Alarm
                isOpen={isSecondAlarmOpen}
                closeAlarm={() => setSecondAlarmOpen(false)}
                btntext="확인"
                onClick={handleSecondAlarmConfirm}
                to="/team"
            >
                지원되었습니다.
            </Alarm>
        </div>
    )
}

export default GuestRecruitmentDetail;