import React, { useState } from 'react';
import './Pagination.css';
import ArrowLeft from './ArrowLeft.svg'; // ArrowLeft 아이콘 경로
import ArrowRight from './ArrowRight.svg'; // ArrowRight 아이콘 경로

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50; // 총 페이지 수

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="nav-button"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeft} alt="Previous" className="arrow-icon" />
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="nav-button"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
        <img src={ArrowRight} alt="Next" className="arrow-icon" />
      </button>
    </div>
  );
};

export default Pagination;