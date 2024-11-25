import React from 'react';
import styles from './Category.module.css';

const DayCategory = ({ selectedOptions, toggleOption }) => {
  const options = ['월', '화', '수', '목', '금', '토', '일'];
  const categoryTitle = '주활동요일 (복수선택가능)';

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

export default DayCategory;
