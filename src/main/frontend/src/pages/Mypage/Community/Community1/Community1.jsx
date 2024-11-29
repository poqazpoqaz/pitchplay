import React from 'react';
import styles from './Community1.module.css';
import { useStore } from '../../../../stores/MatchingStore/useStore';
import MyPost from './MyPost';
import MyComment from './MyComment';





const Community1 = ({gridArea}) => {
    const { state } = useStore();



  return (
    <div style={{ gridArea: gridArea }}>
    <div className={styles.content}>
      <h1 className={styles.title}>마이페이지 &gt; 커뮤니티</h1>
      <div className={styles.actbox}>
        <MyPost/>
        <MyComment/>
      </div>
    </div>
  </div>

  );
};

export default Community1;
