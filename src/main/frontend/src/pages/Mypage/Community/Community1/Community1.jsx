import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Community1.module.css';
import MyPost from './MyPost';
import MyComment from './MyComment';

const Community1 = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'userId' 가져오기
  
  const [contentList, setContentList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (user.userNumber) { // userNumber가 존재할 때만 실행
      axios.get("/data/faqData.json")
        .then(response => {
          const faqs = response.data;

          // userNumber와 userId를 비교하여 해당 유저의 게시글 데이터 필터링(작성자 기준으로 글을 찾은거)
          const filteredFaqs = faqs.filter(data => data.userId === user.userNumber);

          filteredFaqs.forEach((faq) => {
            setContentList((prev) => [...prev, faq]);
          }
          );

          faqs.forEach(data => {
            data.comments.forEach(item => {
              if (item.userNickname === user.nickname) {
                setCommentList((prev) => [...prev, item]);
              }
            });

          });
        })
        .catch(err => {
          console.error("FAQ 데이터를 불러오는 중 오류 발생:", err);
        });
    }
  }, [user.nickname, user.userName]); // userNumber와 userNickname이 변경될 때마다 실행

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 커뮤니티</h1>
        <div className={styles.actbox}>
          <MyPost contents={contentList} />
          <MyComment comments={commentList} />
        </div>
      </div>
    </div>
  );
};

export default Community1;
