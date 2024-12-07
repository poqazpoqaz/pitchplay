import styles from './MypageAct05.module.css';
import MemberList from './MemberList';
import { useEffect, useState } from 'react';
import { useStore as TeamStore } from "../../../../stores/TeamStore/useStore";
import axios from 'axios';
import MoveButton from './MoveButton';
import { useParams } from 'react-router-dom';


const MypageAct05 = () => {
  const {teamCode} = useParams();
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기
  const { state: teamState, actions: teamActions } = TeamStore();

  const [isManager, setIsManager] = useState(false); // 유저가 매니저인지 확인하는 상태
  const [selectedRole, setSelectedRole] = useState(''); // 직위 선택 상태
  const [notification, setNotification] = useState(''); // 알림 메시지 상태
  const [dropdownOpen, setDropdownOpen] = useState(null); // 드롭다운 열고 닫기 상태

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // 선택한 드롭다운 열기/닫기
  };

  // 팀 정보 저장
  useEffect(() => {
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
          teamActions.changeTeamMember(selectedTeam.teamMember);

          // 유저가 팀에서 매니저인지 확인
          const userInTeam = selectedTeam.teamMember.find(member => member.name === user.nickname);
          if (userInTeam && userInTeam.role === "Manager") {
            setIsManager(true); // 매니저이면 true로 설정
          } else {
            setIsManager(false); // 아니면 false로 설정
          }

        } else {
          console.error("팀을 찾을 수 없습니다.");
        }
      })
      .catch(err => {
        console.error("팀 데이터를 불러오는 중 오류 발생:", err);
      });
  }, []);

  const handleRoleChange = (index, newRole) => {
    if (!isManager) return; // 매니저만 역할 변경 가능

    // 현재 멤버를 복사
    const updatedMembers = [...teamState.teamMember];

    // 해당 멤버의 role만 변경
    updatedMembers[index] = { ...teamState.teamMember[index], role: newRole };

    // 역할 변경
    teamActions.changeTeamMember(updatedMembers);

    // 알람창
    setNotification(`${teamState.teamMember[index].name}님의 직위가 ${newRole}로 변경되었습니다.`);
    setTimeout(() => {
      setNotification(''); // 알림 3초 후 사라지도록 설정
    }, 3000);

    // 드롭다운 닫기
    setDropdownOpen(null);
  };

  const handleDelete = (index) => {
    // 현재 멤버를 복사
    const updatedMembers = [...teamState.teamMember];

    if (window.confirm('정말로 이 멤버를 추방하시겠습니까?')) {
      // 해당 멤버를 제거 
      const newMembers = updatedMembers.filter((_, i) => i !== index);

      // 상태 업데이트 (actions.changeMember를 사용해서 새 배열 전달)
      teamActions.changeTeamMember(newMembers);

      setDropdownOpen(null); // 드롭다운 닫기
    };
  }


  return (
    <div>
      <h1 className={styles.titi}>팀원 목록</h1>

      <MemberList
        members={teamState.teamMember}
        handleRoleChange={handleRoleChange}
        handleDelete={handleDelete}
        notification={notification}
        selectedRole={selectedRole}
        handleDropdownToggle={handleDropdownToggle}
        dropdownOpen={dropdownOpen}
      />
      <MoveButton
      teamCode={teamState.teamCode}
      id = {user.id}
      />
    </div>
  );
};
export default MypageAct05;
