import React from "react";
import Accordion from "./Accordion";
import styles from "./SelectorList.module.css";

export const SelectorList = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export const Selector = ({ initValue, values, value, onChangeValue }) => {
  return (
    <div style={{ textWrap: "nowrap" }}>
      <Accordion value={value} onChangeValue={onChangeValue}>
        <Accordion.Header>{initValue}</Accordion.Header>
        <Accordion.Content>
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
