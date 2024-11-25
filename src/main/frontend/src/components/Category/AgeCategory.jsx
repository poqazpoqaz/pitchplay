import React from 'react';
import styles from './Category.module.css';

const AgeCategory = ({ selectedOptions, toggleOption }) => {
  const options = ['10대', '20대', '30대', '40대', '50대 이상'];
  const categoryTitle = '나이대 (복수선택가능)';

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

export default AgeCategory;
