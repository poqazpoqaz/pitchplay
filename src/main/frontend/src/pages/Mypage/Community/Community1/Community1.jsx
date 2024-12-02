import React, { useState, useEffect } from 'react';
import styles from './Community1.module.css';
import MyPost from './MyPost';
import MyComment from './MyComment';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Community1 = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 userId 가져오기
  const [contents, setContents] = useState([]);
  const [comments, setComments] = useState([]);
  const [userNumber, setUserNumber] = useState(null); // userNumber 상태 추가

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
            date: data.date,
            viewCount: data.views || 0, // viewCount 추가
          })));

          setComments(filteredData.flatMap(data => data.comments)); // 댓글 정보 저장
        })
        .catch(err => {
          console.error("Error fetching FAQ data:", err);
        });
    }
  }, [userNumber]);

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 커뮤니티</h1>
        <div className={styles.actbox}>
          <MyPost contents={contents} />
          <MyComment comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Community1;
