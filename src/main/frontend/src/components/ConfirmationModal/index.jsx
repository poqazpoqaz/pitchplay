import Modal from "../Modal/Modal";
import Button from "../Button";
import { useState, createContext, useContext } from "react";

const ConfirmationModalContext = createContext();

/**
 *
 * @param {Object} props
 * @param {Function} props.onClose
 * @param {Function} props.onConfirm
 * @param {String} props.content
 * @param {React.ReactNode} props.children
 * @param {String} props.completeText
 * @returns
 */
const ConfirmationModal = ({
  onClose,
  onConfirm,
  content,
  children,
  completeText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const parsedContent = content?.split("\\n").map((line, index) => (
    <p key={index}>
      {line}
      <br />
    </p>
  ));

  const handleConfirm = async () => {
    await onConfirm();
    setIsComplete(true);
  };

  const handleSubModalClose = () => {
    setIsComplete(false);
    setIsOpen(false);

  };

  const handleCancel = () => {
    onClose && onClose();
    setIsOpen(false);
  };


  return (
    <ConfirmationModalContext.Provider
      value={{ isComplete, setIsComplete, setIsOpen }}
    >
      <Modal isOpen={isOpen} closeModal={onClose}>
        {parsedContent}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
          }}
        >
          <Button color="var(--main-color)" onClick={handleConfirm}>네</Button>
          <Button color="var(--main-color)" onClick={handleCancel}>아니요</Button>
        </div>
      </Modal>
      <Modal isOpen={isComplete} closeModal={onClose}>
        <div>{completeText}</div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
          }}
        >
          <Button color="var(--main-color)" onClick={handleSubModalClose}>확인</Button>
        </div>
      </Modal>
      {children}
    </ConfirmationModalContext.Provider>
  );
};

export const ConfirmationModalTrigger = ({ children}) => {
  const { setIsOpen } = useContext(ConfirmationModalContext);

  return <div onClick={() => setIsOpen(true)}>{children}</div>;
};

export default ConfirmationModal;
