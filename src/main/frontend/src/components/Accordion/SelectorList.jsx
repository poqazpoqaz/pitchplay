import React from "react";
import Accordion from "./Accordion";
import styles from "./SelectorList.module.css";

const SelectorList = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export const Selector = ({
  initValue,
  values,
  value,
  onChangeValue,
  headerClassName,
  contentClassName,
}) => {
  return (
    <div style={{ textWrap: "nowrap" }}>
      <Accordion value={value} onChangeValue={onChangeValue}>
        <Accordion.Header className={headerClassName}>
          {initValue}
        </Accordion.Header>
        <Accordion.Content className={contentClassName}>
          {values.map((value) => (
            <Accordion.Item key={value} value={value}>
              {value}
            </Accordion.Item>
          ))}
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default SelectorList;