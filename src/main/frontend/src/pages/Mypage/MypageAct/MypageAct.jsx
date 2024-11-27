import React from 'react';
import MatchesSection from "./MatchesSection";
import RecordsSection from "./RecordsSection";
import TeamSection from "./TeamSection";
import PostsSection from "./PostsSection";
import { useStore } from '../../../stores/useStore';  // store 훅 임포트
import styles from "./MypageAct.module.css";


const MypageAct = () => {
  const { state, actions } = useStore();  // 스토어에서 상태와 액션을 가져옵니다.
  const { matches, records, teamInfo, posts } = state;  // 필요한 데이터 가져오기



  return (
    <div>
      <div>
        <div className={styles.content}>
          <h1>마이페이지 &gt; 내 활동</h1>
          <MatchesSection matches={matches} />
          <RecordsSection records={records} />
          <TeamSection teamInfo={teamInfo} />
          <PostsSection posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default MypageAct;
