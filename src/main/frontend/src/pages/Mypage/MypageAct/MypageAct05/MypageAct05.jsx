import styles from './MypageAct05.module.css';
import MemberList from './MemberList';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore as TeamStore } from "../../../../stores/TeamStore/useStore";
import axios from 'axios';


const MypageAct05 = () => {
  const { teamCode } = useParams();
  const { state: teamState, actions: teamActions } = TeamStore();

  // 팀 정보 저장 ** 나중에 백에서 불러올때는 내가 속한 팀만 
  useEffect(() => {
    axios.get("/data/teamData.json")
      .then(response => {
        const datas = response.data;
        const selectedTeam = datas.find(data => data.teamCode === teamCode);
        if (selectedTeam) {
          teamActions.changeTeamName(selectedTeam.teamName);
          teamActions.changeTeamCode(selectedTeam.teamCode);
          teamActions.changeTeamImg(selectedTeam.teamImg);
          teamActions.changeTeamDescription(selectedTeam.teamDescription);
          teamActions.changeTeamLevel(selectedTeam.teamLevel);
          teamActions.changeTeamDay(selectedTeam.teamDay);
          teamActions.changeTeamTime(selectedTeam.teamTime);
          teamActions.changeTeamCity(selectedTeam.teamCity);
          teamActions.changeTeamLoc(selectedTeam.teamLoc);
          teamActions.changeTeamAge(selectedTeam.teamAge);
          teamActions.changeTeamGender(selectedTeam.teamGender);
          teamActions.changeCurrentMember(selectedTeam.currentMember);
          teamActions.changeTotalMember(selectedTeam.totalMember);
          teamActions.changeTeamMember(selectedTeam.teamMember);
        } else {
          console.error("팀을 찾을 수 없습니다.");
        }
      })
      .catch(err => {
        console.error("팀 데이터를 불러오는 중 오류 발생:", err);
      });
  }, [teamCode]); 

  return (
    <div>
      <h1 className={styles.titi}>팀원 목록</h1>
      <MemberList
        members={teamState.teamMember}
        actions={teamActions}
      />
    </div>
  );
};
export default MypageAct05;
