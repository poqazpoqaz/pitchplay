import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";
import { useState } from "react";
import Alarm from "../../components/Alarm";

import styles from "./GuestRecruitmentDetail.module.css";
import ReservationDetail from "../../containers/ReservationDetail/ReservationDetail";
import GuestRecruitmentPost from "../../containers/PostDetail/GuestRecruitmetnPost";
import Button from "../../components/Button";

function GuestRecruitmentDetail({ gridArea }) {
    const { state: collectionStore, actions: collectionActions } = CollectionStore();
    const { state: recruitState, actions: recruitActions } = ReservationStore();
    const { state: teamStore, actions: teamActions } = TeamStore();

    const [isFirstAlarmOpen, setFirstAlarmOpen] = useState(false); // 첫 번째 알람 상태
    const [isSecondAlarmOpen, setSecondAlarmOpen] = useState(false); // 두 번째 알람 상태

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
            <img src={recruitState.stadiumImg} />
            <GuestRecruitmentPost
                recruitContent={recruitState}
                teamContent={teamStore}
                collectionContent={collectionStore[0]}
                gridArea="team" />
            <div style={{ gridArea: "reservation" }}>
                <ReservationDetail
                    content={recruitState} />
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
            >
                지원되었습니다.
            </Alarm>
        </div>
    )
}

export default GuestRecruitmentDetail;