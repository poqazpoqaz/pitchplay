import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button";
import styles from "./ReplyModal.module.css";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

import BoardManagementSVG from "../../../../public/icons/boardmanage.svg";
const ReplyContext = createContext();

/**
 *
 * @param {Object} props
 * @param {String} props.title
 * @param {String} props.content
 * @param {String} props.authorName
 * @param {String} props.createdAt
 * @param {Function} props.onReply
 * @param {React.ReactNode} props.children
 * @returns
 */
const ReplyModal = ({
  title,
  content,
  authorName,
  onReply,
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reply, setReply] = useState("");

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleReply = async () => {
    // axios.post로 답변보내기
    onReply(reply);  // onReply 함수 호출 (부모에서 정의한 답변 처리 함수)
    handleModalClose();
    setReply("");
  };

  return (
    <ReplyContext.Provider value={{ isOpenModal, setIsOpenModal }}>
      <Modal isOpen={isOpenModal} closeModal={handleModalClose}>
        <div className={styles["modal-content"]}>
          <div>
            <h2 className={styles["modal-header"]}>
              <img
                src={BoardManagementSVG}
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              <h5>기타관리 상세페이지</h5>
            </h2>
            <div className={styles["modal-sub-header"]}>
              <p>{title}</p>
              <p>작성자: {authorName}</p>
            </div>
          </div>
          <div className={styles["modal-text"]}>
          <p>{content}</p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={styles["modal-body"]}/>
          </div>
          <Button onClick={handleReply} color="var(--main-color)">보내기</Button>
        </div>
      </Modal>
      {children}
    </ReplyContext.Provider>
  );
};

export const ReplyModalTrigger = ({ children }) => {
  const { setIsOpenModal } = useContext(ReplyContext);

  const handleClick = () => {
    setIsOpenModal(true);
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default ReplyModal;
