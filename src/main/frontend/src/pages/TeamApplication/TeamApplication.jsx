import Button from "../../components/Button";
import TeamDescription from "../../components/TeamProfile/TeamDescription";
import TeamProfile from "../../components/TeamProfile/TeamProfile";
import JoinRequestModal from "../../components/JoinRequestModal";
import styles from "./TeamApplication.module.css"
import Alarm from "../../components/Alarm";
import { useStore } from "../../stores/TeamStore/useStore";
import { useState } from "react";


function TeamApplication() {
    const { state, actions } = useStore();
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

    return (
        <div className={styles['teamapplication-grid']}>
            <TeamProfile content={state} gridArea="teamprofile" />
            <TeamDescription content={state} gridArea="teamIntro" />
            <Button color="var(--main-color)" gridArea="btn" onClick={openModal}>가입신청</Button>
            {isModalOpen && <JoinRequestModal isOpen={isModalOpen} closeModal={closeModal} openAlarm={openAlarm} />}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm}>가입신청이 완료되었습니다.</Alarm>}
        </div>
    );
}

export default TeamApplication;