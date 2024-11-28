import React from 'react';
import MatchesSection from "./MypageActComponents/MatchesSection";
import RecordsSection from "./MypageActComponents/RecordsSection";
import TeamSection from "./MypageActComponents/TeamSection";
import PostsSection from "./MypageActComponents/PostsSection";
import { useStore as MatchingStore } from '../../../stores/MatchingStore/useStore';  // store 훅 임포트
import { useStore as TeamStore} from "../../../stores/TeamStore/useStore";
import styles from "./MypageAct.module.css";


const MypageAct = ({gridArea}) => {
  const { state: MatchingState } = MatchingStore();
  const { state: TeamState} = TeamStore();




  return (
    <div style={{gridArea:gridArea}}>
      <div>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동</h1>
          <MatchesSection matches={MatchingState} />
          <RecordsSection records={MatchingState} />
          <TeamSection teamInfo={TeamState} />
          <PostsSection />
        </div>
      </div>
    </div>
  );
};

export default MypageAct;
