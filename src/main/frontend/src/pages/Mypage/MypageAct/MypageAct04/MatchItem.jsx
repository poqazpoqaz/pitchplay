import React from 'react';
import styles from './MatchItem.module.css';

const MatchItem = ({ matches }) => {  
  return (
    <div className={styles.itembox}>
      {matches.map((match, index) => (
        <div key={index} className={styles.matchItem}>
          <div className={styles.cardContent}>
            <h2 className={styles.teamName}>{match.teams.team1.name} vs {match.teams.team2.name}</h2>
            <div className={styles.matchDetails}>
              <p><strong>날짜:</strong> {match.date}</p>
              <p><strong>장소:</strong> {match.location}</p>
              <p><strong>성별:</strong> {match.gender}</p>
              <p><strong>레벨:</strong> {match.level}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchItem;
