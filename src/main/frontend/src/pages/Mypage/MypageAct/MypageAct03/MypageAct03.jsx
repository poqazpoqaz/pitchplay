import React from 'react';
import Teaminfo from './Teaminfo';
import styles from './MypageAct03.module.css';
import { useStore } from '../../../../stores/TeamStore/useStore';
import Teamimg from './Teamimg';
import { Link } from 'react-router-dom';


const MypageAct03 = ({gridArea}) => {
    const { state } = useStore();

    const teamInfo = {
        image: state.teamImg,
        name: state.teamName,
        location: `${state.teamCity} ${state.teamLoc}`,
        teamMembers: state.totalMember,
        teamCode: state.teamCode,
    };

    const formFields = [
        { label: "팀 이름", name: "teamName", value: state.teamName },
        { label: "지역", name: "cityloc", value: `${state.teamCity} ${state.teamLoc}` },
        { label: "주 활동 요일", name: "teamDay", value: state.teamDay },
        { label: "성별", name: "gender", value: state.teamGender },
        { label: "주요 나이대", name: "age", value: state.teamAge },
        { label: "레벨", name: "level", value: state.teamLevel },
        { label: "팀 소개", name: "intro", value: state.teamDescription },

    ];


  return (
    <div style={{ gridArea: gridArea }}>
    <div className={styles.content}>
      <h1>마이페이지 &gt; 내활동 &gt; 예약한 경기 목록</h1>
      <div className={styles.actbox}>
        <Teamimg teamInfo={teamInfo}/>
      <Teaminfo formFields={formFields}/>
      </div>
    </div>
  </div>

  );
};

export default MypageAct03;
