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

    useEffect(() => {
        const fetchData = async () => {
            try {
                //예약데이터
                const reservationResponse = await axios.get("/data/reservationData.json");
                const reservation = reservationResponse.data.find(data => data.collectionNumber === postNumber);
                if (reservation) {
                    reservationActions.updateAllFields(reservation);
                } else {
                    console.log("해당 예약을 찾을 수 없습니다.");
                    return;
                }

                // 모집 데이터 불러오기 (reservationData에 teamCode가 있을 경우)
                const collectionResponse = await axios.get("/data/collectionsData.json");
                const collection = collectionResponse.data.find(data => data.teamCode === reservation.teamCode);
                if (collection) {
                    collectionActions.updateAllFields(collection);
                } else {
                    console.error("해당 팀을 찾을 수 없습니다.");
                    return;
                }

                // 팀 데이터 불러오기 (reservationData에 teamCode가 있을 경우)
                const teamResponse = await axios.get("/data/teamData.json");
                const team = teamResponse.data.find(data => data.teamCode === reservation.teamCode);
                if (team) {
                    teamActions.updateAllFields(team);
                } else {
                    console.error("팀 데이터를 찾을 수 없습니다.");
                    return;
                }

                // 구장 데이터 불러오기 (reservationData에 stadiumId가 있을 경우)
                const stadiumResponse = await axios.get("/data/stadiumData.json");
                const stadium = stadiumResponse.data.find(stadium => stadium.SVCID === reservation.stadiumId);
                if (stadium) {
                    stadiumActions.updateAllFields({
                        stadiumId: stadium.SVCID,
                        stadiumName: stadium.SVCNM,
                        stadiumImg: stadium.IMGURL,
                        stadiumAddress: stadium.PLACENM,
                        stadiumDescription: stadium.DTLCONT,
                        stadiumX: stadium.X,
                        stadiumY: stadium.Y,
                        stadiumCost: stadium.PAYATNM,
                        stadiumVmin: stadium.V_MIN,
                        stadiumVmax: stadium.V_MAX
                    });
                } else {
                    console.error("구장 데이터를 찾을 수 없습니다.");
                }

            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchData();
    }, [postNumber])


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
                <p>지원하시겠습니까? 지원 시 프로필이 팀에게 공개됩니다.</p>
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