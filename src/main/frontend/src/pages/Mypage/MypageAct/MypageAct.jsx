import React, { useState } from 'react';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as MatchingStore } from '../../../stores/MatchingStore/useStore';
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import { useStore as StadiumStore} from "../../../stores/StadiumStore/useStore";
import { useStore as FAQStore} from "../../../stores/FAQStore/useStore";
import { useEffect } from 'react';
import axios from 'axios';
import styles from "./MypageAct.module.css";



const MypageAct = ({ gridArea }) => {
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const { state: teamState, actions: teamActions } = TeamStore();
  const { state: StadiumState, actions: StadiumActions} = StadiumStore();
  const [contents, setContents] = useState([]);
  const [comments, setComments] = useState([]);
  const [matchingList, setMatchingList] = useState([]);


  // 매칭 정보 저장 ** 나중에 백에서 불러올때는 내가 속한 팀의 매칭데이터만 불러와서 뿌려야함 !! 
  // 매칭 정보 저장
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const datas = response.data;

        // 로컬 상태나 일괄 저장 방식으로 변경
        datas.forEach(data => {
          matchingActions.changeMatchingNumber(data.matchingNumber);
          matchingActions.changeTeamName(data.teamName);
          matchingActions.changeTeamImg(data.teamImg);
          matchingActions.changeMatchingDate(data.changeMatchingDate);
          matchingActions.changeMatchingLoc(data.matchingLoc);
          matchingActions.changeTeamGender(data.teamGender);
          matchingActions.changeTeamLevel(data.teamLevel);
          matchingActions.changeViewCount(data.viewCount);
          matchingActions.changeWrittenDate(data.writtenDate);
        });

        setMatchingList(datas);
      })
      .catch(err => {
        console.error("Error fetching matching data:", err);
      });
  }, []);

  // 팀 정보 저장 ** 나중에 백에서 불러올때는 내가 속한 팀의 매칭데이터만 불러와서 뿌려야함
  useEffect(() => {
    axios.get("/data/teamData.json")
      .then(response => {
        const datas = response.data;
        const myTeam = datas.find(data => data.teamCode === "pitchplay1");

        if (myTeam) {
          teamActions.changeTeamName(myTeam.teamName);
          teamActions.changeTeamCode(myTeam.teamCode);
          teamActions.changeTeamImg(myTeam.teamImg);
          teamActions.changeTeamDescription(myTeam.teamDescription);
          teamActions.changeTeamLevel(myTeam.teamLevel);
          teamActions.changeTeamDay(myTeam.teamDay);
          teamActions.changeTeamTime(myTeam.teamTime);
          teamActions.changeTeamCity(myTeam.teamCity);
          teamActions.changeTeamLoc(myTeam.teamLoc);
          teamActions.changeTeamAge(myTeam.teamAge);
          teamActions.changeTeamGender(myTeam.teamGender);
          teamActions.changeCurrentMember(myTeam.currentMember);
          teamActions.changeTotalMember(myTeam.totalMember);
        }
      })
      .catch(err => {
        console.error("Error fetching team data:", err);
      });
  }, []);


  useEffect(() => {
    axios.get("/data/faqData.json")
      .then(response => {
        const datas = response.data;
  
        // 게시물 정보 저장
        setContents(datas.map(data => ({
          faqNumber: data.faqNumber,
          title: data.title,
          content: data.content,
          date: data.date
        })));
  
        // 댓글 정보 저장
        setComments(datas.flatMap(data => data.comments));
      })
      .catch(err => {
        console.error("Error fetching FAQ data:", err);
      });
  }, []);



  return (
    <div style={{ gridArea: gridArea }} >
      <div className={styles.congrid}>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동</h1>
          <MatchesSection matches={matchingList.slice(0, 2)} />
          <RecordsSection records={matchingList.slice(0, 2)} />
          <TeamSection teamInfo={teamState} />
          <PostsSection contents={contents} comments={comments}/>
        </div>
      </div>
    </div>
  );
};

export default MypageAct;
