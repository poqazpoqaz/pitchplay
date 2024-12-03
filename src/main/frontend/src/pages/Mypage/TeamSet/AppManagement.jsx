import { useParams } from "react-router-dom";
import styles from "./AppManagement.module.css";
import AppStatus from "./AppStatus";
import axios from 'axios';
import { useEffect, useState } from "react";
import MercenaryStatus from "./MercenaryStatus";
const AppMangement = ({gridArea}) => {
    const { teamCode } = useParams();
    const [pendingMembers,setPendingMembers] = useState([]);
    
    useEffect(() => {
        axios.get("/data/teamData.json")
          .then(response => {
            const team = response.data.find(team => team.teamCode === teamCode);
            if (team) {
              setPendingMembers(team.pendingMembers); // 닉네임 저장
            }
          })
          .catch(err => {
            console.error("Error fetching team data:", err);
          });
      }, [teamCode]);
    return (
        <div style={{ gridArea }}>
          <div className={styles.congrid}>
            <div className={styles.content}>
              <h1 className={styles.title}>마이페이지 &gt; 내 활동  &gt; 나의 팀 &gt; 신청 관리</h1>
              <AppStatus pendingMembers={pendingMembers} />
              <MercenaryStatus/>
            </div>
          </div>
        </div>
      );
    };
export default AppMangement;