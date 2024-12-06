import { useParams } from "react-router-dom";
import styles from "./AppManagement.module.css";
import AppStatus from "./AppStatus";
import MercenaryStatus from "./MercenaryStatus";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import { useStore as UserStore } from "../../../stores/UserStore/useStore";
import { useStore as CollectionStore} from "../../../stores/CollectionStore/useStore";



const AppMangement = ({ gridArea }) => {
  const { teamCode } = useParams();  // URL에서 팀 이름 가져오기
  const [pendingMembers, setPendingMembers] = useState([]);
  const [pendingMemberList, setPendinMemberList] = useState([]);
  const [mercenaryMembers, setMercenaryMembers] = useState([]);
  const [mercenaryMemberList, setMercenaryMemberList] = useState([]);
  const [userData, setUserData] = useState([]); // 사용자 데이터 상태 추가

  const {state : userState ,actions: userActions} = UserStore();
  const {state : teamState , actions : teamActions} = TeamStore();
  
  useEffect(() => {
    // 로컬스토리지에서 유저 데이터 가져오기
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUserData(userDataFromStorage);  // 유저 데이터 설정
    } else {
      console.error("유저 데이터가 로컬스토리지에 없습니다.");
    }

    // 팀 데이터는 외부 API나 파일에서 가져오기
    axios.get("/data/teamData.json")
      .then(response => {
        const team = response.data.find(team => team.teamName === teamCode);
        if (team) {
          setPendingMembers(team.pendingMembers); // 팀의 대기 중인 멤버 설정
        }
      })
      .catch(err => {
        console.error("팀 데이터를 가져오는 중 오류가 발생했습니다:", err);
      });
  }, [teamCode]);

  // pendingMembers와 userData를 결합하여 myDescription 추가
  axios.get("/data/userData.json")
    .then(response => {
      const datas = response.data; // 사용자 데이터
      const arr = []; // 결과 배열

      // pendingMembers의 각 멤버에 대해, userData에서 일치하는 유저를 찾아 description 추가
      pendingMembers.forEach(member => {
        const user = datas.find(user => user.nickname === member.pendingnickname);

        // 일치하는 유저가 있을 경우 nickname과 description을 객체로 추가
        if (user) {
          arr.push({
            pendingnickname: user.nickname,
            description: user.myDescription || '정보 없음', // description이 없으면 '정보 없음'으로 설정
            profileImg: user.profileImg || '/default-profile.jpg', // profileImg가 없으면 기본 이미지 설정
            applicationDate: member.applicationDate // 팀 데이터에서 가져온 applicationDate
          });
        }
      });
      setPendinMemberList(arr);
 
    })
    .catch(err => {
      console.error("Error fetching user data:", err);
    },[pendingMembers]);

    axios.get("/data/collectionsData.json")
      .then(response => {
        const datas = response.data; // 사용자 데이터
      const arr = []; // 결과 배열
      mercenaryMembers.forEach(member => {
        const user = datas.find(user => user.nuckname === member.mercenarynickname);

        if(user) {
          arr.push({
            mercenarynickname: user.nickname,
            description: user.myDescription || '정보 없음', // description이 없으면 '정보 없음'으로 설정
            profileImg: user.profileImg || '/default-profile.jpg', // profileImg가 없으면 기본 이미지 설정
            applicationDate: member.applicationDate // 팀 데이터에서 가져온 applicationDate
          });
        }
      });
      setMercenaryMemberList(arr);
      })



    const onApprove = (member) => {
      axios.get("/data/userData.json")
    .then(response =>{
      const datas = response.data;
      const selectedUser = datas.find(data=>data.nickname === member.pendingnickname);
      
      if(selectedUser){
      userActions.updateAllFields(selectedUser);
      
      }
      console.log(selectedUser);
    })
    .catch(error => {
      console.error("유저 데이터를 가져오는 중 오류가 발생했습니다:", error);
    });
      // 1. 내 팀에 해당 팀을 추가
      userActions.changeMyTeam([...userState.myTeam, teamState.teamName]);

      
      // 2. 팀의 pendingMembers에서 해당 멤버를 제거하고 teamMember에 추가
      teamActions.changeTeamMember([
        ...teamState.teamMember,
        { nickname: member.pendingnickname, profileImg: member.profileImg }
      ]);
      const updatedCurrentMemberCount = teamState.currentMember + 1; 
    
      // 3. pendingMembers에서 해당 멤버를 제거
      const updatedPendingMembers = pendingMembers.filter(
        (m) => m.pendingnickname !== member.pendingnickname
      );
    
      // 4. 업데이트된 pendingMembers 상태를 팀 스토어에 반영
      teamActions.changePendingMembers(updatedPendingMembers);
    
      // 5. 상태 업데이트 (컴포넌트 상태에 반영)
      
      teamActions.changeCurrentMember(updatedCurrentMemberCount); // currentMember 수 반영
      teamActions.changePendingMembers(updatedPendingMembers);
      setPendingMembers(updatedPendingMembers);
    };
    const onReject = (member) => {
      // 1. 팀의 pendingMembers에서 해당 멤버를 제거
      const updatedPendingMembers = pendingMembers.filter(
        (m) => m.pendingnickname !== member.pendingnickname
      );
    
      // 2. 상태 업데이트: changePendingMembers로 팀 스토어의 pendingMembers 변경
      teamActions.changePendingMembers(updatedPendingMembers);
      teamActions.changeCurrentMember(updatedCurrentMemberCount);
      // 3. 상태 업데이트 (컴포넌트 상태에 반영)
      setPendingMembers(updatedPendingMembers);
    };
    
    
  return (
    <div style={{ gridArea }}>
      <div className={styles.congrid}>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동 &gt; 나의 팀 &gt; 신청 관리</h1>
          <AppStatus pendingMembers={pendingMemberList} onApprove={onApprove} onReject={onReject}/>
          <MercenaryStatus />
        </div>
      </div>
    </div>
  );
};

export default AppMangement;
