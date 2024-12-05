import styles from "./Table.module.css";
import React from "react";

const MAX_ROW_COUNT = 15;

export const Table = ({ children, columCount, rowCount, maxRowCount }) => {
  const childrenArray = React.Children.toArray(children);
  const maxRowCounts = maxRowCount ? maxRowCount : MAX_ROW_COUNT;

  const emptyCells =
    maxRowCounts * columCount - childrenArray.length * columCount;

  return (
    <div
      className={styles["grid-table"]}
      style={{
        gridTemplateColumns: `repeat(${columCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      {children}
      {emptyCells > 0 &&
        new Array(emptyCells)
          .fill(null)
          .map((_, index) => (
            <div key={index} className={styles["grid-cell"]}></div>
          ))}
    </div>
  );
};

export const TableRow = ({ children, onClick }) => {
  return (
    <div className={styles["grid-row"]} onClick={onClick}>
      {children}
    </div>
  );
};

export const TableCell = ({ children, isHeader }) => {
  return (
    <div
      className={styles["grid-cell"] + (isHeader ? " " + styles["header"] : "")}
    >
      {children}
    </div>
  );
};
