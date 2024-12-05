import ArrowLeft from "./ArrowLeft.svg";
import ArrowRight from "./ArrowRight.svg";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange}) => {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={styles["pagination-container"]} >
      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeft} alt="Previous" className={styles.arrowIcon} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageNumber} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={ArrowRight} alt="Next" className={styles.arrowIcon} />
      </button>
    </div>
  );
};

export default Pagination;
