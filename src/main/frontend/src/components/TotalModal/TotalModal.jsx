import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './TotalModal.module.css'; // TotalModal 전용 스타일

const TotalModal = ({ isOpen, onClose }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleButtonSelection = (label) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (label) => selectedButtons.includes(label);

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className={styles['modal-content']}>
        {/* 모달 내용 */}
        <section className={styles['modal-body']}>
          {/* 지역 선택 */}
          <div className={styles['form-group']}>
            <label htmlFor="region" className={styles['form-label']}>지역</label>
            <div className={styles['group']}>
              <select id="region" className={styles['dropdown']}>
                <option>지역을 선택해주세요</option>
                <option>서울</option>
                <option>부산</option>
                <option>대구</option>
              </select>
              <select className={styles['dropdown']}>
                <option>세부지역을 선택해주세요</option>
                <option>강남구</option>
                <option>서초구</option>
                <option>해운대구</option>
              </select>
            </div>
          </div>

          {/* 성별 선택 */}
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>성별(복수선택 가능)</label>
            <div className={styles['group']}>
              {['남성', '여성', '혼성'].map((label) => (
                <button
                  key={label}
                  className={`${styles['btn']} ${isActive(label) ? styles['active'] : ''}`}
                  type="button"
                  onClick={() => toggleButtonSelection(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 인원 선택 */}
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>인원(복수선택 가능)</label>
            <div className={styles['group']}>
              {['4 vs 4', '5 vs 5', '6 vs 6', '7 vs 7', '전체'].map((label) => (
                <button
                  key={label}
                  className={`${styles['btn']} ${isActive(label) ? styles['active'] : ''}`}
                  type="button"
                  onClick={() => toggleButtonSelection(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 주 활동 요일 */}
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>주 활동 요일(복수선택 가능)</label>
            <div className={styles['group']}>
              {['월', '화', '수', '목', '금', '토', '일'].map((label) => (
                <button
                  key={label}
                  className={`${styles['btn']} ${isActive(label) ? styles['active'] : ''}`}
                  type="button"
                  onClick={() => toggleButtonSelection(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 활동 시간 */}
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>활동시간(복수선택 가능)</label>
            <div className={styles['group']}>
              {[
                { time: '오전', range: '06~10시' },
                { time: '낮', range: '10~18시' },
                { time: '저녁', range: '18~24시' },
                { time: '심야', range: '24~06시' },
                { time: '전체', range: '' },
              ].map(({ time, range }) => (
                <button
                  key={time}
                  className={`${styles['btn']} ${isActive(time) ? styles['active'] : ''}`}
                  type="button"
                  onClick={() => toggleButtonSelection(time)}
                >
                  <div>{time}</div>
                  <div>{range}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
        <footer className={styles['modal-footer']}>
          <button className={styles['btn-search']} type="button">
            다음
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default TotalModal;
