import Modal from "../../../components/Modal/Modal";
import { useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";
import styles from "./AnnouncementModal.module.css";
import { useEffect, useState } from "react";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import axios from "axios";
import useMutate from "../../../api//useMutate";
import BoardManagementSVG from "../../../../public/icons/boardmanage.svg";

const AdminAnnouncementModal = ({ noticeState, isOpen, closeModal, noticesActions }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noticeState.content) {
      setContent(noticeState.content);
    }
  }, [noticeState.content]);

  const handleUpdate = () => {
    noticesActions.changeContent(content);
    setIsEditting(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
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
              <p>기타 상세관리 페이지 </p>
            </h2>
            <div className={styles["modal-sub-header"]}>
              <h4>
                [{noticeState.category}] {noticeState.title}
              </h4>
              <p>조회수: {noticeState.viewCount}</p>
            </div>
          </div>
          <div>
            {!isEditting &&
              <div style={{ whiteSpace: "pre-line", textAlign: "left" }}>
                {noticeState.content}
                <div className={styles["buttons"]}>
                  <Button onClick={() => setIsEditting(true)} color="var(--main-color)">수정하기</Button>
                  <Button>삭제하기</Button>
                </div>
              </div>
            }
            {isEditting &&
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles["modal-body"]}
                />
                <Button onClick={handleUpdate} color="var(--main-color)">완료하기</Button>
              </div>
            }
            <p className={styles["modal-footer"]}>작성일 {noticeState.createdAt}</p>
          </div>
          <div className={styles["modal-actions"]}>
          </div>
        </div>
      </Modal>

      <Modal
      // isOpen={isOpenUpdateModal}
      // closeModal={() => setIsOpenUpdateModal(false)}
      >
        {/* <p>수정 완료</p>
        <Button onClick={() => setIsOpenUpdateModal(false)}>확인</Button> */}
      </Modal>
    </>
  );
};

export default AdminAnnouncementModal;
