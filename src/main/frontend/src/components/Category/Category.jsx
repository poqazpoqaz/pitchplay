import React from 'react';
import styles from './Category.module.css';

const Category = ({ categoryTitle, options, selectedOptions, handleCategoryClick }) => {
  return (
    <div className={styles['category-block']}>
      <div className={styles['category-title']}>{categoryTitle}</div>
      <div className={styles['options-container']}>
        {options.map((option) => (
          <div
            key={option}
            className={`${styles['option-box']}
              ${selectedOptions.includes(option)
                ? styles['option-box-selected']
                : ''
              }`}
            onClick={() => handleCategoryClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
