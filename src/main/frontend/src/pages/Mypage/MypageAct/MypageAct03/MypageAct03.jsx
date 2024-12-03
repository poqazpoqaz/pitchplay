import Teaminfo from './Teaminfo';
import styles from './MypageAct03.module.css';
import Teamimg from './Teamimg';
import { useEffect } from 'react';
import { useStore as UserStore } from "../../../../stores/UserStore/useStore";
import { useStore as TeamStore } from "../../../../stores/TeamStore/useStore";
import axios from 'axios';


const MypageAct03 = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기
  const { state: userState, actions: userActions } = UserStore();
  const { state: teamState, actions: teamActions } = TeamStore();

  // 팀 정보 저장 
  useEffect(() => {
    if (user.myTeam) {
      axios.get("/data/teamData.json")
        .then(response => {
          const datas = response.data;
          const selectedTeam = datas.find(data => data.teamName === user.myTeam);

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
            teamActions.changeTeamMember(selectedTeam.teamMembers);
          } else {
            console.error("팀을 찾을 수 없습니다.");
          }
        })
        .catch(err => {
          console.error("팀 데이터를 불러오는 중 오류 발생:", err);
        });
    }
  }, [user.myTeam]);

  const teamInfo = {
    image: teamState.teamImg,
    name: teamState.teamName,
    location: `${teamState.teamCity} ${teamState.teamLoc}`,
    teamMembers: teamState.totalMember,
    teamCode: teamState.teamCode,
  };

  const formFields = [
    { label: "팀 이름", name: "teamName", value: teamState.teamName },
    { label: "지역", name: "cityloc", value: `${teamState.teamCity} ${teamState.teamLoc}` },
    { label: "주 활동 요일", name: "teamDay", value: teamState.teamDay },
    { label: "성별", name: "gender", value: teamState.teamGender },
    { label: "주요 나이대", name: "age", value: teamState.teamAge },
    { label: "레벨", name: "level", value: teamState.teamLevel },
    { label: "팀 소개", name: "intro", value: teamState.teamDescription },

  ];


  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
        <div className={styles.actbox}>
          <Teamimg teamInfo={teamInfo} />
          <Teaminfo formFields={formFields} />
        </div>
      </div>
    </div>

  );
};

export default MypageAct03;
