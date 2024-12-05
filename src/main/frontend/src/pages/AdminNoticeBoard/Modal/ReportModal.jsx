// import Modal from "../../../components/Modal/Modal";
// import {
//   useLocation,
//   useParams,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// // import Button from "../../../components/Button";
// // import styles from "./ReportModal.module.css";
// // import { categoryMap } from "../AdminNoticeBoard";

// // import ReplyModal, { ReplyModalTrigger } from "./ReplyModal";
// // import ConfirmationModal from "../../../components/ConfirmationModal/index";
// import useFetch from "../../api/useFetch";
// import axios from "../../../../../node_modules/axios/index";
// import useMutate from "./../../api/useMutate";
// // import BoardManagementSVG from "../../svg/boardmanage.svg";

const AdminReportModal = () => {
  // const path = useLocation().pathname;
  // const params = useParams().id;
  // const openModal = !!params;
  // const navigate = useNavigate();

  // /**@type {"announcement" | "report"} */
  // const category = useSearchParams()[0].get("category");

  // const { data: postData, isLoading: isLoadingPostData } = useFetch(() =>
  //   axios.get(`/data/api/reportData.json`)
  // );
  // const { data: commentData, isLoading: isLoadingCommentData } = useFetch(() =>
  //   axios.get(`/data/api/commentListData.json`)
  // );

  // const { mutate: deletePost } = useMutate((args) =>
  //   axios.delete(`/data/api/reportData.json/${args.param}`, args.options)
  // );

  // const { mutate: deleteComment } = useMutate((args) =>
  //   axios.delete(`/data/api/commentListData.json/${args.param}`, args.options)
  // );

  // const { mutate: replyPost } = useMutate((options) =>
  //   axios.post(`/data/api/reportData.json`, options)
  // );

  // const { mutate: replyComment } = useMutate((options) =>
  //   axios.post(`/data/api/commentListData.json`, options)
  // );

  // if (isLoadingPostData || isLoadingCommentData) {
  //   return <div>로딩중...</div>;
  // }

  // if (category !== "report") return null;

  // const handleDeletePost = () => {
  //   deletePost({ param: postData.id, options: {} });
  // };

  // const handleDeleteComment = () => {
  //   deleteComment({ param: commentData.id, options: {} });
  // };

  // const handleReplyPost = (content) => {
  //   replyPost({ content });
  // };

  // const handleReplyComment = (content) => {
  //   replyComment({ content });
  // };

  // const handleMainModalClose = () => {
  //   const prevPath = path.split("/").slice(0, -1).join("/");
  //   navigate(prevPath);
  // };

  return (
    <>
      <Modal isOpen={openModal} closeModal={handleMainModalClose}>
        {/* <div className={styles["modal-content"]}>
          <div>
            <h2 className={styles["modal-header"]}>
              <img
                src={BoardManagementSVG}
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              <h5>FAQ 상세페이지</h5>
            </h2>
            <div className={styles["modal-sub-header"]}>
              <h4>[{categoryMap[category]}] 게시판</h4>
            </div>
          </div>
          <div>
            <div className={styles["modal-body"]}>
              <div className={styles["post-content"]}>
                <div className={styles["post-header"]}>
                  <h3 className={styles["post-title"]}>{postData.title}</h3>
                  <div className={styles["post-meta"]}>
                    <div className={styles["post-author"]}>
                      <img src={MyPageSVG} />
                      <p>{postData.authorName}</p>
                    </div>
                    <div className={styles["post-stats"]}>
                      <p>no.{postData.postNumber}</p>
                      <p>조회수 : {postData.viewCount}</p>
                    </div>
                  </div>
                </div>
                <p className={styles["post-body"]}>{postData.content}</p>
                <p className={styles["post-footer"]}>
                  작성일 {postData.createdAt}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["modal-actions"]}>
            <ConfirmationModal
              onConfirm={handleDeletePost}
              completeText="삭제 완료"
              content="게시글을 \n삭제하시겠습니까"
            >
              <ConfirmationModalTrigger>
                <Button>삭제</Button>
              </ConfirmationModalTrigger>
            </ConfirmationModal>
            <ReplyModal
              title={postData.title}
              authorName={postData.authorName}
              createdAt={postData.createdAt}
              content={postData.content}
              onReply={handleReplyPost}
            >
              <ReplyModalTrigger>
                <Button>답변하기</Button>
              </ReplyModalTrigger>
            </ReplyModal>
          </div>
          <div>
            <span className={styles["comments-header"]}>댓글</span>
            <div>
              {commentData.map((comment, index) => (
                <div key={index} className={styles["comment"]}>
                  <div className={styles["comment-content"]}>
                    <div className={styles["comment-author"]}>
                      <img src={MyPageSVG} />
                      <p>{comment.authorName}</p>
                    </div>
                    <p>{comment.content}</p>
                    <div className={styles["comment-actions"]}>
                      <ConfirmationModal
                        onConfirm={handleDeleteComment}
                        completeText="삭제 완료"
                        content="댓글을 \n삭제하시겠습니까?"
                      >
                        <ConfirmationModalTrigger>
                          <Button>삭제</Button>
                        </ConfirmationModalTrigger>
                      </ConfirmationModal>
                      <ReplyModal
                        title="답변하기"
                        authorName={comment.authorName}
                        createdAt={comment.createdAt}
                        content={comment.content}
                        onReply={handleReplyComment}
                      >
                        <ReplyModalTrigger>
                          <Button>답변하기</Button>
                        </ReplyModalTrigger>
                      </ReplyModal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </Modal>
    </>
  );
};

export default AdminReportModal;
