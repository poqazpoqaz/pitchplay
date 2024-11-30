import React, { useState, useEffect } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import MatchItem from "./Matchitem";
import styles from './MypageAct04.module.css';
import Linkb from "./Linkb";
import { useStore as MatchingStore } from "../../../../stores/MatchingStore/useStore"; // 상태 관리 사용
import axios from "axios";

const MypageAct04 = ({ gridArea }) => {
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  const [matchingList, setMatchingList] = useState([]);

  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [filteredMatches, setFilteredMatches] = useState([]);

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
          <Linkb />
          {/* Calendar 컴포넌트에 onSelect를 전달 */}
          <Calendar onSelect={handleDateSelect} allData={matchingList} />

          <MatchItem matches={filteredMatches} /> {/* 필터된 매칭 데이터 표시 */}
        </div>
      </div>
    </div>
  );
};

export default MypageAct04;
