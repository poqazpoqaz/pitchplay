import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PostInfo.module.css';
import PostList from './PostList';

const PostInfo = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기
  const [postingList, setPostingList] = useState([]);

  useEffect(() => {
    if (user.userNumber) {
      axios.get("/data/faqData.json")
        .then(response => {
          const faqs = response.data;

          // userNumber와 일치하는 게시글 필터링
          const filteredFaqs = faqs.filter(data => data.userId === user.userNumber);

          // 상태를 한 번만 업데이트
          setPostingList(filteredFaqs);
        })
        .catch(err => {
          console.error("FAQ 데이터를 불러오는 중 오류 발생:", err);
        });
    }
  }, [user.userNumber]); // userNumber만 의존성 배열에 추가

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 커뮤니티</h1>
        <div className={styles.actbox}>
          <PostList posts={postingList} />
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
