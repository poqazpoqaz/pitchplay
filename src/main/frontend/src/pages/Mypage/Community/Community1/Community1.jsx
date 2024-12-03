import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore as UserStore } from '../../../../stores/UserStore/useStore.jsx';
import { useStore as FAQStore } from '../../../../stores/FAQStore/useStore';
import styles from './Community1.module.css';
import MyPost from './MyPost';
import MyComment from './MyComment';

const Community1 = ({ gridArea }) => {
  const { id } = useParams(); // URL에서 userId 가져오기
  const { state: userState, actions: userActions } = UserStore(); // UserStore에서 state와 actions 가져오기
  const { state: faqState, actions: faqActions } = FAQStore(); // FAQStore에서 state와 actions 가져오기


  const [contentList, setContentList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  // 첫 번째 useEffect: userData.json에서 userNumber 가져오기
  useEffect(() => {
    axios.get("/data/userData.json")
      .then(response => {
        const datas = response.data;
        const userAct = datas.find(data => data.id === id); // userId와 일치하는 유저 찾기
        if (userAct) {
          userActions.changeUserNumber(userAct.userNumber); // userNumber 저장
          userActions.changeNickname(userAct.nickname); // 유저 닉네임 저장
        } else {
          console.error("유저를 찾을 수 없습니다.");
        }
      })
      .catch(err => {
        console.error("유저 데이터를 불러오는 중 오류 발생:", err);
      });
  }, [id]);

  // 두 번째 useEffect: faqData.json에서 userNumber로 게시글과 댓글 필터링
  useEffect(() => {
    if (userState.userNumber) { // userNumber가 존재할 때만 실행
      axios.get("/data/faqData.json")
        .then(response => {
          const faqs = response.data;

          // userNumber와 userId를 비교하여 해당 유저의 게시글 데이터 필터링(작성자 기준으로 글을 찾은거)
          const filteredFaqs = faqs.filter(data => data.userId === userState.userNumber);

          filteredFaqs.forEach((faq) => {
            faqActions.changeContent(faq.content);
            faqActions.changeFaqNumber(faq.faqNumber);
            faqActions.changeTitle(faq.title);
            faqActions.changeDate(faq.date);
            faqActions.changeViews(faq.views || 0);
            setContentList((prev) => [...prev, faq]);
          }
          );

            faqs.forEach(data => {
            data.comments.forEach(item => {
              if (item.userNickname === userState.nickname) {
                faqActions.changeComment(item);


                setCommentList((prev) => [...prev, item]);
              }
            });
          });
        })
        .catch(err => {
          console.error("FAQ 데이터를 불러오는 중 오류 발생:", err);
        });
    }
  }, [userState.nickname, userState.userNumber]); // userNumber와 userNickname이 변경될 때마다 실행

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
