import React, { useState } from "react";
import GoodSVG from "./Good.svg";  
import BadSVG from "./Bad.svg";   
import styles from './LikeDislikeButton.module.css'; 

function LikeDislikeButton({area}) {
  // 상태 변수 설정 (좋아요, 싫어요 숫자)
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  // 좋아요 클릭 시 처리
  const handleGoodClick = () => {
    setGoodCount(goodCount + 1);
  };

  // 싫어요 클릭 시 처리
  const handleBadClick = () => {
    setBadCount(badCount + 1);
  };

  return (
    <div className={styles['button-container']} style={{gridArea : area}}>
      {/* 좋아요 버튼 */}
      <button className={styles['button', 'good']} onClick={handleGoodClick}>
        <img src={GoodSVG} alt="Good" className="icon" />
        {goodCount}
      </button>

      {/* 싫어요 버튼 */}
      <button className={styles['button', 'bad']} onClick={handleBadClick}>
        <img src={BadSVG} alt="Bad" className="icon" />
        {badCount}
      </button>
    </div>
  );
}

export default LikeDislikeButton;