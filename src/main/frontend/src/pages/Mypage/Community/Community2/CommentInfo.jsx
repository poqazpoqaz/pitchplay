import React from 'react';
import styles from './CommentInfo.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';


const CommentInfo = ({ gridArea }) => {

    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기
    const [commentList, setCommentList] = useState([]);

    // 매칭 정보 저장 (user가 포함한 팀의 매칭데이터 가져옴)
    useEffect(() => {
        if (user.userNumber) { // userNumber가 존재할 때만 실행
          axios.get("/data/faqData.json")
            .then(response => {
              const faqs = response.data 
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
      }, [user.nickname, user.userName]);


    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.content}>
                <h1 className={styles.title}>마이페이지 &gt; 커뮤니티</h1>
                <div className={styles.actbox}>
                    <CommentList comments={commentList}/>
                </div>
            </div>
        </div>
    )
}

export default CommentInfo;