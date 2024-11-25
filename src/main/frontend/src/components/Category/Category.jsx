import React, { useState } from 'react';
import NumberCategory from '../category/NumberCategory';
import TimeCategory from '../category/TimeCategory';
import AgeCategory from '../category/AgeCategory';
import GenderCategory from '../category/GenderCategory';
import DayCategory from '../category/DayCategory';
import styles from '../category/Category.module.css';

const Category = () => {
  // selectedOptions 상태는 각 카테고리별로 선택된 옵션들을 관리
  const [selectedOptions, setSelectedOptions] = useState({});

  // toggleOption 함수는 특정 카테고리의 옵션 선택 여부를 토글하는 함수
  const toggleOption = (category, option) => {
    setSelectedOptions((prevState) => {
      const categorySelections = prevState[category] || [];
      const isSelected = categorySelections.includes(option);
      const updatedSelections = isSelected
        ? categorySelections.filter((item) => item !== option)
        : [...categorySelections, option];

      return { ...prevState, [category]: updatedSelections };
    });
  };

  return (
    <div className={styles['Category-container']}>
      {/* 카테고리 컴포넌트 렌더링 */}
      <NumberCategory selectedOptions={selectedOptions} toggleOption={toggleOption} />
      <TimeCategory selectedOptions={selectedOptions} toggleOption={toggleOption} />
      <AgeCategory selectedOptions={selectedOptions} toggleOption={toggleOption} />
      <GenderCategory selectedOptions={selectedOptions} toggleOption={toggleOption} />
      <DayCategory selectedOptions={selectedOptions} toggleOption={toggleOption} />
    </div>
  );
};

export default Category;
