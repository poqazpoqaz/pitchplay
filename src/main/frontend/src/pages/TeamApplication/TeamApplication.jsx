import Button from "../../components/Button";
import TeamDescription from "../../components/TeamProfile/TeamDescription";
import TeamProfile from "../../components/TeamProfile/TeamProfile";
import JoinRequestModal from "../../components/JoinRequestModal";
import styles from "./TeamApplication.module.css"
import Alarm from "../../components/Alarm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStore } from "../../stores/TeamStore/useStore";


function TeamApplication() {
    const { state, actions } = useStore();
    const { teamCode } = useParams();  // URL에서 teamCode를 가져옵니다.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);


    useEffect(() => {
        // 데이터를 가져오는 비동기 작업
        axios.get("/data/teamData.json")
            .then(response => {
                const datas = response.data; // teamData.json의 데이터 가져오기
                const teamData = datas.find(data => data.teamCode === teamCode); // 해당 팀 찾기
                console.log(teamData)
                if (teamData) {
                    // 팀 데이터를 상태에 설정
                    actions.changeTeamName(teamData.teamName);
                    actions.changeTeamCode(teamData.teamCode);
                    actions.changeTeamImg(teamData.teamImg);
                    actions.changeTeamDescription(teamData.teamDescription);
                    actions.changeTeamLevel(teamData.teamLevel);
                    actions.changeTeamDay(teamData.teamDay);
                    actions.changeTeamTime(teamData.teamTime);
                    actions.changeTeamCity(teamData.teamCity);
                    actions.changeTeamLoc(teamData.teamLoc);
                    actions.changeTeamAge(teamData.teamAge);
                    actions.changeTeamGender(teamData.teamGender);
                    actions.changeCurrentMember(teamData.currentMember);
                    actions.changeTotalMember(teamData.totalMember);
                    actions.changeCollectionTitle(teamData.collectionTitle);
                } else {
                    console.error("해당 팀을 찾을 수 없습니다.");
                }
            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [teamCode]);


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
            {isModalOpen &&
                <JoinRequestModal isOpen={isModalOpen} closeModal={closeModal} openAlarm={openAlarm} titletext="가입신청" buttontext="신청하기">
                    <p>가입 신청 시에 팀에게 프로필과 연락처가 공개됩니다.</p>
                    <p><span style={{ fontWeight: "bold" }}>개인정보 공개에 동의</span>하실 경우 버튼을 눌러 신청해주세요.</p>
                </JoinRequestModal>}
            {isAlarmOpen && <Alarm btntext="확인" isOpen={isAlarmOpen} closeAlarm={closeAlarm} onClick={closeAlarm} to="/team/member">가입신청이 완료되었습니다.</Alarm>}
        </div>
    );
}

export default TeamApplication;