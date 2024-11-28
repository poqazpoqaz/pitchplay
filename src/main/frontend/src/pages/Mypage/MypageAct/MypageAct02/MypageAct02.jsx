import React from 'react';
import MatchList from './RecordList';
import styles from './MypageAct02.module.css';
import { useStore } from '../../../../stores/TeamStore/useStore';


const MypageAct02 = ({gridArea}) => {
    const { state } = useStore();
    const { records } = state;



  return (
    <div style={{ gridArea: gridArea }}>
    <div className={styles.content}>
      <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
      <div className={styles.actbox}>
      <MatchList matches={records}/>
      </div>
    </div>
  </div>

  );
};

export default MypageAct02;
