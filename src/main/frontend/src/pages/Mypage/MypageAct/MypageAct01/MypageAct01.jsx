import React, { useState, useEffect } from 'react';
import MatchList from './MatchList';
import styles from './MypageAct01.module.css';
import axios from 'axios';

const MypageAct01 = ({ gridArea }) => {
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


  
  // 예약 취소 함수 정의
  const handleCancelMatch = (match) => {
    console.log('Cancelling match:', match);

    // 예약 취소 처리 로직 (예: 서버 요청 또는 로컬 상태 업데이트)
    setMatchingList((prevMatches) => prevMatches.filter((m) => m.matchingNum !== match.matchingNum));
    alert(`${match.location} 예약이 취소되었습니다.`);

  };

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.content}>
        <h1 className={styles.title}>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
        <div className={styles.actbox}>
          <MatchList matches={matchingList} onCancelMatch={handleCancelMatch} />
        </div>
      </div>
    </div>
  );
};

export default MypageAct01;
