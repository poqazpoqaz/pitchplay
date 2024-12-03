import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as MatchingStore } from '../../../stores/MatchingStore/useStore';
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import { useStore as UserStore } from "../../../stores/UserStore/useStore";
import { useStore as FAQStore } from "../../../stores/FAQStore/useStore";
import axios from 'axios';
import styles from "./MypageAct.module.css";

const MypageAct = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 userId 가져오기
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const { state: teamState, actions: teamActions } = TeamStore();
  const { state: userState, actions: userActions } = UserStore();
  const { state: faqState, actions: faqActions } = FAQStore();

  const [contents, setContents] = useState([]); // 내가 쓴 게시물
  const [comments, setComments] = useState([]); // 내가 쓴 댓글
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수

  const [upcomingMatches, setUpcomingMatches] = useState([]); // 예약기록
  const [pastMatches, setPastMatches] = useState([]); // 경기기록

  // userId 기반으로 userData 가져오기
  useEffect(() => {
    axios.get("/data/userData.json")
      .then(response => {
        const user = response.data.find(user => user.id === id); // userId와 일치하는 유저 찾기
        if (user) {
          userActions.changeUserNumber(user.userNumber);
          userActions.changeNickname(user.nickname);
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
      });
  }, [id]);

  // FAQ 데이터 로드 및 필터링
  useEffect(() => {
    if (userState.userNumber) {
      axios.get("/data/faqData.json")
        .then(response => {
          const faqs = response.data;
          // 내가 작성한 게시물 필터링
          const filteredData = faqs.filter(data => data.userId === userState.userNumber);
          filteredData.forEach((faq) => {
            faqActions.changeContent(faq.content);
            faqActions.changeFaqNumber(faq.faqNumber);
            faqActions.changeTitle(faq.title);
            faqActions.changeDate(faq.date);
            faqActions.changeViews(faq.views || 0);
            setContents((prev) => [...prev, faq]);
          });
          faqs.forEach(data => {
            data.comments.forEach(item => {
              if (item.userNickname === userState.nickname) {
                faqActions.changeComment(item);
                setComments((prev) => [...prev, item]);
              }
            });
          });
        })
        .catch(err => {
          console.error("Error fetching FAQ data:", err);
        });
    }
  }, [userState.userNumber, userState.nickname]);

  // 매칭 정보 로드 및 필터링
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const matches = response.data;

        // 현재 시간 기준으로 필터링
        const currentDate = new Date();

        const upcoming = []; // 예약기록
        const past = []; // 경기기록

        matches.forEach(match => {
          const matchingDate = new Date(match.matchingDate.replace(" ", "T")); // Date 객체로 변환
          if (matchingDate > currentDate) {
            upcoming.push(match); // 예약기록에 추가
          } else {
            past.push(match); // 경기기록에 추가
          }
        });

        // 매칭 상태 업데이트 (스토어에 저장)
        matchingActions.changeMatchingNumber(upcoming.length); // 예약된 매칭 갯수 업데이트
        matchingActions.changeViewCount(upcoming.reduce((acc, match) => acc + (match.viewCount || 0), 0)); // 총 조회수 업데이트

        // 예약기록과 경기기록을 state에 설정
        setUpcomingMatches(upcoming);
        setPastMatches(past);
      })
      .catch(err => console.error("Error fetching matching data:", err));
  }, [matchingActions]); // 매칭 데이터 로드 및 필터링

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
