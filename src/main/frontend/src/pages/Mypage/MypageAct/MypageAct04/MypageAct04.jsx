import React, { useState, useEffect } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import MatchItem from "./Matchitem";
import styles from './MypageAct04.module.css';
import Linkb from "./Linkb";
import axios from "axios";

const MypageAct04 = ({ gridArea }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기

  const [matchingList, setMatchingList] = useState([]);

  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [filteredMatches, setFilteredMatches] = useState([]);

  // 매칭 정보 저장
  useEffect(() => {
    axios.get("/data/matchingData.json")
      .then(response => {
        const datas = response.data;
        const selectedMatches = datas.filter(data =>
          data.teams.team1.name === user.myTeam || data.teams.team2.name === user.myTeam);
        setMatchingList(selectedMatches);
      })
      .catch(err => {
        console.error("Error fetching matching data:", err);
      });
  }, []);

  // 날짜 범위가 선택될 때 호출되는 함수
  const handleDateSelect = (filteredData) => {
    setFilteredMatches(filteredData);  // 필터된 매칭 데이터를 상태에 저장
  };

  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      const filtered = matchingList.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate >= selectedRange.start && matchDate <= selectedRange.end;
      });
      setFilteredMatches(filtered);
    }
  }, [selectedRange, matchingList]);  // 날짜 범위가 변경될 때마다 매칭 데이터 필터링


  return (
    <div style={{ gridArea }}>
      <div className={styles.content}>
        <h1>마이페이지 &gt; 내 활동 &gt; 나의 팀</h1>
        <div className={styles.actbox}>
          <Linkb 
          id = {user.id}
          />
          {/* Calendar 컴포넌트에 onSelect를 전달 */}
          <Calendar onSelect={handleDateSelect} allData={matchingList} />

          <MatchItem matches={filteredMatches} /> {/* 필터된 매칭 데이터 표시 */}
        </div>
      </div>
    </div>
  );
};

export default MypageAct04;
