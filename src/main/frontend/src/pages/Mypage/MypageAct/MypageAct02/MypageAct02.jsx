import React from 'react';
import styles from './MypageAct02.module.css';
import RecordList from './RecordList';
import { useState, useEffect } from 'react';
import axios from 'axios';


const MypageAct02 = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기
  const [matchingList, setMatchingList] = useState([]);

  // 매칭 정보 저장 (user가 포함한 팀의 매칭데이터 가져옴)
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const datas = response.data;
  
        // nickname이 매칭 데이터의 nickname과 일치하는 매칭만 필터링
        const selectedMatches = datas.filter(data => data?.nickname === user?.nickname);
  
        setMatchingList(selectedMatches);
      })
      .catch(err => {
        console.error("Error fetching matching data:", err);
      });
  }, [user?.nickname]);

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 참가한 경기 목록</h1>
        <div className={styles.actbox}>
          <RecordList records={matchingList} />
        </div>
      </div>
    </div>

  );
};

export default MypageAct02;
