// import Modal from "../../../../components/Modal/Modal";
// import {
//   useLocation,
//   useParams,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import Button from "../../../../components/Button";
// // import MembershipManagementSVG from "../../../../components/Sidebar/MembershipManagement.svg";
// import styles from "./AnnouncementModal.module.css";
// import ConfirmationModal from "../../../../components/ConfirmationModal";
// import { useEffect, useState } from "react";
// import { categoryMap } from "../AdminNoticeBoard";
// import { ConfirmationModalTrigger } from "../../../../components/ConfirmationModal/index";
// import useFetch from "../../api/useFetch";
// import axios from "../../../../../node_modules/axios/index";
// import useMutate from "./../../api/useMutate";
// import BoardManagementSVG from "../../svg/boardmanage.svg";

const AdminAnnouncementModal = () => {
  // const path = useLocation().pathname;
  // const params = useParams().id;
  // const openModal = !!params;
  // const navigate = useNavigate();

  // const [content, setContent] = useState("");

  // /**@type {"announcement" | "report"} */
  // const category = useSearchParams()[0].get("category");
  // const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  // const { data, isLoading } = useFetch(() =>
  //   axios.get(`/data/api/announcementData.json`)
  // );

  // const { mutate: update } = useMutate((options) =>
  //   axios.put(`/data/api/announcementData.json`, options)
  // );

  // const { mutate: deleteAnnouncement, isLoading: isDeleting } = useMutate(
  //   (options) => axios.delete(`/data/api/announcementData.json`, options)
  // );

  // useEffect(() => {
  //   if (data) {
  //     setContent(data.content);
  //   }
  // }, [data]);

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  // if (category !== "announcement") return null;

  // const handleUpdate = () => {
  //   update({ content });
  //   setIsOpenUpdateModal(true);
  // };

  // const handleDeleteCofirmModal = () => {
  //   deleteAnnouncement({ id: data.id });
  // };

  // const handleMainModalClose = () => {
  //   const prevPath = path.split("/").slice(0, -1).join("/");
  //   navigate(prevPath);
  // };

  return (
    <>
      {/* <Modal isOpen={openModal} closeModal={handleMainModalClose}>
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
              <h5>기타 상세관리 페이지 </h5>
            </h2>
            <div className={styles["modal-sub-header"]}>
              <h4>
                [{categoryMap[category]}] {data.title}
              </h4>
              <h5>조회수: {data.viewCount}</h5>
            </div>
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles["modal-body"]}
              defaultValue={data.content}
            />
            <h5 className={styles["modal-footer"]}>작성일 {data.createdAt}</h5>
          </div>
          <div className={styles["modal-actions"]}>
            <Button onClick={handleUpdate}>수정하기</Button>
            <ConfirmationModal
              onConfirm={handleDeleteCofirmModal}
              completeText={isDeleting ? "삭제중..." : "삭제가 완료되었습니다"}
              content="게시글을 \n삭제하시겠습니까?"
            >
              <ConfirmationModalTrigger>
                <Button>삭제하기</Button>
              </ConfirmationModalTrigger>
            </ConfirmationModal>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenUpdateModal}
        closeModal={() => setIsOpenUpdateModal(false)}
      >
        <p>수정 완료</p>
        <Button onClick={() => setIsOpenUpdateModal(false)}>확인</Button>
      </Modal> */}
    </>
  );
};

export default AdminAnnouncementModal;
