import React from 'react';
import MatchList from './MatchList';
import styles from './MypageAct01.module.css';
import { useStore } from '../../../../stores/MatchingStore/useStore';

const MypageAct01 = ({ gridArea }) => {
  const { state } = useStore();
  const matches = state;


  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
        <div className={styles.actbox}>
          <MatchList matches={matches} />
        </div>
      </div>
    </div>
  );
};
export default MypageAct01;
