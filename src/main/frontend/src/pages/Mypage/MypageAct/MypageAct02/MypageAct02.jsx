import React from 'react';
import styles from './MypageAct02.module.css';
import { useStore } from '../../../../stores/MatchingStore/useStore';
import RecordList from './RecordList';


const MypageAct02 = ({gridArea}) => {
    const { state } = useStore();



  return (
    <div style={{ gridArea: gridArea }}>
    <div className={styles.content}>
      <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 참가한 경기 목록</h1>
      <div className={styles.actbox}>
      <RecordList records={state}/>
      </div>
    </div>
  </div>

  );
};

export default MypageAct02;
