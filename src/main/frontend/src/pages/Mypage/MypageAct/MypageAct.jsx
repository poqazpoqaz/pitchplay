import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as MatchingStore } from '../../../stores/MatchingStore/useStore';
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import axios from 'axios';
import styles from "./MypageAct.module.css";

const MypageAct = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 userId만 받아옴
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const { state: teamState, actions: teamActions } = TeamStore();
  const [contents, setContents] = useState([]); // 내가 쓴 게시물
  const [comments, setComments] = useState([]); // 내가 쓴 댓글
  const [matchingList, setMatchingList] = useState([]);
  const [userNumber, setUserNumber] = useState(null); // userNumber 상태 추가
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수를 저장할 상태 추가

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
          const filteredData = response.data.filter(data => data.userId === userNumber); // 내가 작성한 게시물 필터링
          setContents(filteredData.map(data => ({
            faqNumber: data.faqNumber,
            title: data.title,
            content: data.content,
            date: data.date,
            comment: data.comments,
            name: data.writenNickname // 게시물의 댓글 정보도 포함
          })));

          // 내가 작성한 댓글만 필터링
          const myComments = response.data.flatMap(data => 
            data.comments.filter(comment => comment.userNickname === id) // 댓글 작성자 nickname이 URL의 id와 일치하는 경우
          );
          setComments(myComments); // 내가 작성한 댓글만 저장

          // 댓글의 개수 계산
          setCommentCount(myComments.length); // 댓글 개수를 상태에 저장
        })
        .catch(err => {
          console.error("Error fetching FAQ data:", err);
        });
    }
  }, [userNumber, id]); // `id`로 변경, nickname을 직접 사용하지 않음

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
