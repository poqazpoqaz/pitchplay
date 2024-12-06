import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button";
import styles from "./ReportModal.module.css";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import ReplyModal, {ReplyModalTrigger} from "./ReplyModal";
import { useState } from "react";

const AdminReportModal = ({ isOpen, closeModal, faqState, faqActions }) => {

  const handleDelete = () => {
    closeModal();
    // 백 연동시에는 axios.delete
  }

  const handleDeleteComment = (index) => {
    const updatedComments = faqState.comments.filter((_, i) => i !== index);
    // 상태 업데이트
    faqActions.changeComment(updatedComments); // faqState 동기화
  };

  const handleReplyPost = () => {
    // axios post로 답 보내는 로직 
    closeModal();
  };

    const handleReplyComment = (index, replyContent) => {
      const replyComment = {
        userNickname: "관리자",
        comment: `답변: ${replyContent}`,
      };

      // faqState.comments 업데이트
      const updatedFaqComments = faqState.comments.map((comment, i) => comment);
      updatedFaqComments.splice(index + 1, 0, replyComment); // 동일하게 특정 위치에 삽입
      faqActions.changeComment(updatedFaqComments); // 상태 업데이트
    };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className={styles["modal-content"]}>
        <div>
          <h2 className={styles["modal-header"]}>
            <p>FAQ 상세페이지</p>
          </h2>
          <div className={styles["modal-sub-header"]}>
            <h4>{faqState.category} 게시판</h4>
          </div>
        </div>
        <div>
          <div className={styles["modal-body"]}>
            <div className={styles["post-content"]}>
              <div className={styles["post-header"]}>
                <h3 className={styles["post-title"]}>{faqState.title}</h3>
                <div className={styles["post-meta"]}>
                  <div className={styles["post-author"]}>
                    <p>{faqState.authorName}</p>
                  </div>
                  <div className={styles["post-stats"]}>
                    <p>no.{faqState.postNumber}</p>
                    <p>조회수 : {faqState.viewCount}</p>
                  </div>
                </div>
              </div>
              <p className={styles["post-body"]}>{faqState.content}</p>
              <p className={styles["post-footer"]}>
                작성일 {faqState.createdAt}
              </p>
            </div>
          </div>
        </div>
        <div className={styles["modal-actions"]}>
          <ReplyModal
            title={faqState.title}
            authorName={faqState.authorName}
            createdAt={faqState.createdAt}
            content={faqState.content}
            onReply={handleReplyPost}
          >
            <ReplyModalTrigger>
              <Button color="var(--main-color)">답변하기</Button>
            </ReplyModalTrigger>
          </ReplyModal>
          <ConfirmationModal
            onConfirm={handleDelete}
            completeText="삭제 완료"
            content="게시글을 \n삭제하시겠습니까"
          >
            <ConfirmationModalTrigger>
              <Button>삭제</Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
        <div>
          <span className={styles["comments-header"]}>댓글</span>
          <div>
            {faqState.comments && faqState.comments.map((comment, index) => (
              <div key={index} className={styles["comment"]}>
                <div className={styles["comment-content"]}>
                  <div className={styles["comment-author"]}>
                    <p>{comment.userNickname}</p>
                  </div>
                  <p className={styles.textleft}>{comment.comment}</p>
                  <div className={styles["comment-actions"]}>
                  <ReplyModal
                      title="답변하기"
                      authorName={comment.userNickname}
                      content={comment.comment}
                      onReply={(replyContent) =>
                        handleReplyComment(index, replyContent)
                      }
                    >
                      <ReplyModalTrigger>
                        <Button color="var(--main-color)">답변하기</Button>
                      </ReplyModalTrigger>
                    </ReplyModal>
                    <ConfirmationModal
                      onConfirm={() => handleDeleteComment(index)}
                      content="댓글을 \n삭제하시겠습니까?"
                      completeText="삭제되었습니다."
                    >
                      <ConfirmationModalTrigger>
                        <Button>삭제</Button>
                      </ConfirmationModalTrigger>
                    </ConfirmationModal>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminReportModal;