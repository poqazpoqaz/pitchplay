import React, { useState } from 'react';
import styles from './Accordion.module.css';
import ArrowDown from './ArrowDown.svg';
import ArrowUp from './ArrowUp.svg';

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('자주하는 질문');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
// 아코디언을 닫는 돌아가는로직
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className={styles['accordion-container']}>
      <div className={styles['accordion-header']} onClick={toggleMenu}>
        <span>{selectedItem}</span>
        <img
          src={isOpen ? ArrowUp : ArrowDown}
          alt={isOpen ? 'Close' : 'Open'}
          className={styles['accordion-icon']}
        />
      </div>
      <div className={`${styles['accordion-content']} ${isOpen ? styles.active : ''}`}>
        <div onClick={() => handleItemClick('자주하는 질문')}>자주하는 질문</div>
        <div onClick={() => handleItemClick('매너 / 제재')}>매너 / 제재</div>
        <div onClick={() => handleItemClick('구장 질문')}>구장 질문</div>
        <div onClick={() => handleItemClick('사이트 건의 / 제보')}>사이트 건의 / 제보</div>
      </div>
    </div>
  );
};

export default Accordion;
