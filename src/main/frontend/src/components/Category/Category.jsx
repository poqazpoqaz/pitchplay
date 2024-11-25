import React, { useState } from 'react';
import styles from './Category.module.css';

const categories = [
  {
    title: '나이대 (복수선택가능)',
    options: ['10대', '20대', '30대', '40대', '50대 이상'],
  },
  {
    title: '성별 (복수선택가능)',
    options: ['남성', '여성', '혼성'],
  },
  {
    title: '인원 (복수선택가능)',
    options: ['4vs4', '5vs5', '6vs6', '7vs7', '8명이상'],
  },
  {
    title: '주활동요일 (복수선택가능)',
    options: ['월', '화', '수', '목', '금', '토', '일'],
  },
  {
    title: '활동시간 (복수선택가능)',
    options: ['오전\n06~10시', '낮\n10~18시', '저녁\n18~24시', '심야\n24~06시', '전체\n24시간'],
  },
];
const Category = () => {
  // selectedOptions 상태는 각 카테고리별로 선택된 옵션들을 관리
  const [selectedOptions, setSelectedOptions] = useState({});

  // toggleOption 함수는 특정 카테고리의 옵션 선택 여부를 토글하는 함수
  const toggleOption = (category, option) => {
    setSelectedOptions((prevState) => {
      // 카테고리별로 선택된 옵션 목록을 가져옵니다.
      const categorySelections = prevState[category] || [];
      
      // 현재 옵션이 이미 선택된 옵션인지 확인
      const isSelected = categorySelections.includes(option);
      
      // 선택 여부에 따라 옵션을 추가하거나 제거
      const updatedSelections = isSelected
        ? categorySelections.filter((item) => item !== option)  // 선택되어 있으면 제거
        : [...categorySelections, option];  // 선택되지 않았다면 추가

      // 이전 상태에 변경된 카테고리 옵션 목록을 업데이트하여 반환
      return { ...prevState, [category]: updatedSelections };
    });
  };

  return (
    <div className={styles['Category-container']}>
      {/* categories 배열을 순회하며 각 카테고리를 렌더링 */}
      {categories.map((category) => (
        <div key={category.title} className={styles['category-block']}>
          {/* 카테고리 제목 표시 */}
          <div className={styles['category-title']}>{category.title}</div>
          <div className={styles['options-container']}>
            {/* 각 카테고리 내의 옵션을 순회하며 렌더링 */}
            {category.options.map((option) => (
              <div
                key={option}
                className={`${styles['option-box']} ${
                  // 현재 옵션이 선택되었으면 스타일을 변경
                  selectedOptions[category.title]?.includes(option)
                    ? styles['option-box-selected']  // 선택된 옵션에는 'option-box-selected' 클래스 추가
                    : ''
                }`}
                onClick={() => toggleOption(category.title, option)}  // 옵션 클릭 시 toggleOption 함수 호출
              >
                {option}  {/* 옵션 이름 표시 */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default Category;
