import React from 'react';
import styles from './Category.module.css';

const NumberCategory = ({ selectedOptions, toggleOption }) => {
  const options = ['4vs4', '5vs5', '6vs6', '7vs7', '8명이상'];
  const categoryTitle = '인원 (복수선택가능)';

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

export default NumberCategory;
