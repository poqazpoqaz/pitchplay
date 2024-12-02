import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as MatchingStore } from '../../../stores/MatchingStore/useStore';
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import { useStore as StadiumStore } from "../../../stores/StadiumStore/useStore";
import { useStore as FAQStore } from "../../../stores/FAQStore/useStore";
import axios from 'axios';
import styles from "./MypageAct.module.css";

const MypageAct = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 userId 가져오기
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const { state: teamState, actions: teamActions } = TeamStore();
  const [contents, setContents] = useState([]);
  const [comments, setComments] = useState([]);
  const [matchingList, setMatchingList] = useState([]);
  const [userNumber, setUserNumber] = useState(null); // userNumber 상태 추가
  console.log(id);
  // userId 기반으로 userData 가져오기
  useEffect(() => {
    axios.get("/data/userData.json")
      .then(response => {
        const user = response.data.find(user => user.id === id); // userId와 일치하는 유저 찾기
        if (user) {
          setUserNumber(user.userNumber); // 해당 유저의 userNumber 저장
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
      });
  }, [id]);

  // FAQ 데이터 로드 및 필터링
  useEffect(() => {
    if (userNumber) {
      axios.get("/data/faqData.json")
        .then(response => {
          const filteredData = response.data.filter(data => data.userId === userNumber); // userNumber와 일치하는 데이터만 필터링
  
          setContents(filteredData.map(data => ({
            faqNumber: data.faqNumber,
            title: data.title,
            content: data.content,
            date: data.date
          })));
  
          setComments(filteredData.flatMap(data => data.comments)); // 댓글 정보 저장
        })
        .catch(err => {
          console.error("Error fetching FAQ data:", err);
        });
    }
  }, [userNumber]);

  // 매칭 정보 로드
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => setMatchingList(response.data))
      .catch(err => console.error("Error fetching matching data:", err));
  }, []);

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.congrid}>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동</h1>
          <MatchesSection matches={matchingList.slice(0, 2)} />
          <RecordsSection records={matchingList.slice(0, 2)} />
          <TeamSection teamInfo={teamState} />
          <PostsSection contents={contents} comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default MypageAct;
