import React, { useState, useEffect } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { useStore } from "../../../../stores/MatchingStore/useStore"; // 상태 관리 사용
import MatchItem from "./Matchitem";
import styles from './MypageAct04.module.css';

const MypageAct04 = ({ gridArea }) => {
  const { state } = useStore();  // 상태에서 매칭 데이터 가져오기
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [filteredMatches, setFilteredMatches] = useState([]);

  // 날짜 범위가 선택될 때 호출되는 함수
  const handleDateSelect = (filteredData) => {
    setFilteredMatches(filteredData);  // 필터된 매칭 데이터를 상태에 저장
  };

  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      const filtered = state.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate >= selectedRange.start && matchDate <= selectedRange.end;
      });
      setFilteredMatches(filtered);
    }
  }, [selectedRange, state]);  // 날짜 범위가 변경될 때마다 매칭 데이터 필터링

  return (
    <div style={{ gridArea }}>
        <div className={styles.content}>
        <h1>마이페이지 &gt; 내 활동 &gt; 나의 팀</h1>
            <div className={styles.actbox}>
      
      
      {/* Calendar 컴포넌트에 onSelect를 전달 */}
      <Calendar onSelect={handleDateSelect} allData={state} />

      <MatchItem matches={filteredMatches}/> {/* 필터된 매칭 데이터 표시 */}
    </div>
    </div>
    </div>
  );
};

export default MypageAct04;
