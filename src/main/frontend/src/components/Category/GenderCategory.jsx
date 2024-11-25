import React from 'react';
import styles from './Category.module.css';

const GenderCategory = ({ selectedOptions, toggleOption }) => {
  const options = ['남성', '여성', '혼성'];
  const categoryTitle = '성별 (복수선택가능)';

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

export default GenderCategory;
