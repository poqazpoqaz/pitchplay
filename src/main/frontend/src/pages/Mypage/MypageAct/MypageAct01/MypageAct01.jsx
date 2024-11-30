import React from 'react';
import MatchList from './MatchList';
import styles from './MypageAct01.module.css';

import { useStore as MatchingStore } from '../../../../stores/MatchingStore/useStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MypageAct01 = ({ gridArea }) => {
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const [matchingList, setMatchingList] = useState([]);

  // 매칭 정보 저장 ** 나중에 백에서 불러올때는 내가 예약한 매칭데이터만 불러와서 뿌려야함 !! 
  // 매칭 정보 저장
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const datas = response.data;

        // 로컬 상태나 일괄 저장 방식으로 변경
        datas.forEach(data => {
          matchingActions.changeMatchingNumber(data.matchingNumber);
          matchingActions.changeTeamName(data.teamName);
          matchingActions.changeTeamImg(data.teamImg);
          matchingActions.changeMatchingDate(data.changeMatchingDate);
          matchingActions.changeMatchingLoc(data.matchingLoc);
          matchingActions.changeTeamGender(data.teamGender);
          matchingActions.changeTeamLevel(data.teamLevel);
          matchingActions.changeViewCount(data.viewCount);
          matchingActions.changeWrittenDate(data.writtenDate);
        });

        setMatchingList(datas);
      })
      .catch(err => {
        console.error("Error fetching matching data:", err);
      });
  }, []);


  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
        <div className={styles.actbox}>
          <MatchList matches={matchingList} />
        </div>
      </div>
    </div>
  );
};
export default MypageAct01;