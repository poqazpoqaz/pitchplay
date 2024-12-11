import React, { useState } from "react";
import Button from "../../../components/Button";
import styles from "./PaymentButtons.module.css";

const PaymentButtons = ({ value, onChangeValue, gridArea}) => {
  const [selectedButton, setSelectedButton] = useState(value);

  const handleButtonClick = (button) => {
    onChangeValue(button);
    setSelectedButton(button);
  };

  return (
    <div className={styles["container"]} style={{gridArea: gridArea}}>
      <Button
        onClick={() => handleButtonClick("결제관리")}
        color={selectedButton === "결제관리" ? "var(--main-color)" : null}
        size="large"
      >
        결제관리
      </Button>
      <Button
        onClick={() => handleButtonClick("환불관리")}
        color={selectedButton === "환불관리" ? "var(--main-color)" : null}
        size="large"
      >
        캐시관리
      </Button>
    </div>
  );
};

export default PaymentButtons;
