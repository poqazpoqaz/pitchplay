import Modal from "../../../../components/Modal/Modal";
import Button from "../../../../components/Button";
import styles from "./ReplyModal.module.css";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

import BoardManagementSVG from "../../svg/boardmanage.svg";
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
  content: initialContent,
  authorName,
  createdAt,
  onReply,
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleReply = async () => {
    await onReply(content);
    handleModalClose();
  };

  const replyContent = `
  ${content}
  ------------------------
  답변:
  `;

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
              <h4>{title}</h4>
              <h5>작성자: {authorName}</h5>
            </div>
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles["modal-body"]}
              defaultValue={replyContent}
            />
            <h5 className={styles["modal-footer"]}>작성일 {createdAt}</h5>
          </div>
          <Button onClick={handleReply}>보내기</Button>
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
