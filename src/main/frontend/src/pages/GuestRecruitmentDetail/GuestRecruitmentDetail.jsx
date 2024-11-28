import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";


import styles from "./GuestRecruitmentDetail.module.css";
import ReservationDetail from "../../containers/ReservationDetail/ReservationDetail";
import GuestRecruitmentPost from "../../containers/PostDetail/GuestRecruitmetnPost";
import Button from "../../components/Button";

function GuestRecruitmentDetail({ gridArea }) {
    const { state: collectionStore, actions: collectionActions } = CollectionStore();
    const { state: recruitState, actions: recruitActions } = ReservationStore();
    const { state: teamStore, actions: teamActions } = TeamStore();

    return (
        <div className={styles['recruitment-detail-grid']} style={{ gridArea: gridArea }}>
            <img src={recruitState.stadiumImg} />
            <GuestRecruitmentPost
                recruitContent={recruitState}
                teamContent={teamStore}
                collectionContent={collectionStore[0]}
                gridArea="team" />
            <div style={{gridArea: "reservation"}}>
                <ReservationDetail
                    content={recruitState}/>
                <Button gridArea="btn" color="var(--main-color)" size="xlarge">지원하기</Button>
            </div>
        </div>
    )
}

export default GuestRecruitmentDetail;