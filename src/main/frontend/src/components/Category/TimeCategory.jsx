// TimeCategory.js
import React from 'react';
import styles from './Category.module.css';

const TimeCategory = ({ selectedOptions, toggleOption }) => {
  const options = ['오전\n06~10시', '낮\n10~18시', '저녁\n18~24시', '심야\n24~06시', '전체\n24시간'];
  const categoryTitle = '활동시간 (복수선택가능)';

  return (
    <div className={styles['category-block']}>
      <div className={styles['category-title']}>{categoryTitle}</div>
      <div className={styles['options-container']}>
        {options.map((option) => (
          <div
            key={option}
            className={`${styles['option-box']} ${
              selectedOptions[categoryTitle]?.includes(option)
                ? styles['option-box-selected']
                : ''
            }`}
            onClick={() => toggleOption(categoryTitle, option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeCategory;
