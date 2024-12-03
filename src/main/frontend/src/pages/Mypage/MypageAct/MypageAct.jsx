import React, { useState, useEffect } from 'react';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import axios from 'axios';
import styles from "./MypageAct.module.css";

const MypageAct = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기

  const { state: teamState, actions: teamActions } = TeamStore();

  const [contents, setContents] = useState([]); // 내가 쓴 게시물
  const [comments, setComments] = useState([]); // 내가 쓴 댓글
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수

  const [upcomingMatches, setUpcomingMatches] = useState([]); // 예약기록
  const [pastMatches, setPastMatches] = useState([]); // 경기기록

  // FAQ 데이터 로드 및 필터링
  useEffect(() => {
    if (user && user.userNumber) {
      axios.get("/data/faqData.json")
        .then(response => {
          const faqs = response.data;
          // 내가 작성한 게시물 필터링
          const filteredData = faqs.filter(data => data.userId === user.userNumber);
          setContents(filteredData);

          faqs.forEach(data => {
            data.comments.forEach(item => {
              if (item.userNickname === user.nickname) {
                setComments((prev) => [...prev, item]);
              }
            });

          });
        })
        .catch(err => {
          console.error("Error fetching FAQ data:", err);
        });
    }
  }, [user.userNumber, user.nickname]);

  // 매칭 정보 저장 (user가 포함한 팀의 매칭 데이터 가져옴)
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const datas = response.data;
        // user가 포함된 팀 이름이 team1이나 team2에 포함된 매칭 데이터 필터링
        const selectedMatches = datas.filter(data =>
          data.teams.team1.name === user.myTeam || data.teams.team2.name === user.myTeam);

        // 예약과 과거 경기 필터링
        const upcoming = [];
        const past = [];
        const currentDate = new Date();

        selectedMatches.forEach(match => {
          const matchingDate = new Date(match.matchingDate.replace(" ", "T"));
          if (matchingDate > currentDate) {
            upcoming.push(match); // 예약기록
          } else {
            past.push(match); // 경기기록
          }
        });

        setUpcomingMatches(upcoming); // 예약된 경기 목록 설정
        setPastMatches(past); // 과거 경기 목록 설정
      })
      .catch(err => {
        console.error("Error fetching matching data:", err);
      });
  }, [user.myTeam]);

  // 팀 정보 저장
  useEffect(() => {
    axios.get("/data/teamData.json")
      .then(response => {
        const datas = response.data;
        const selectedTeam = datas.find(data => data.teamName === user.myTeam);
        teamActions.updateAllFields(selectedTeam);
      })
      .catch(err => {
        console.error("Error fetching team data:", err);
      });
  }, [user.myTeam]);

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.congrid}>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동</h1>
          {/* 예약한 경기 목록 */}
          <MatchesSection matches={upcomingMatches.slice(0, 2)} />
          {/* 지난 경기 기록 목록 */}
          <RecordsSection records={pastMatches.slice(0, 2)} />
          <TeamSection teamInfo={teamState} />
          <PostsSection contents={contents} comments={comments} commentCount={commentCount} />
        </div>
      </div>
    </div>
  );
};

export default MypageAct;