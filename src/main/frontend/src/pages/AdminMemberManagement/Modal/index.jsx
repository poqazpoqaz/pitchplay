import Modal from "../../../components/Modal/Modal";
import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Button from "../../../components/Button";
import UserManagementSVG from "../../../../public/icons/usermanage.svg";
import styles from "./index.module.css";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import axios from "axios";
import useMutate from "../../../api/useMutate";


const headers = {
  userNumber: "회원번호",
  id: "유저아이디",
  email: "이메일",
  name: "유저이름",
  nickname: "닉네임",
  isTeamOwner: "팀 생성 여부",
  myTeam: "소속팀 이름",
  phone: "전화번호",
  favoriteCity: "선호지역",
  joindate: "가입일",
  userCash: "잔액",
  accountNumber: "계좌번호",
  isDeleted: "탈퇴여부",
};

const AdminMemberManagementModal = ({userState, isOpen, closeModal}) => {
  const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.delete(`/data/api/memberData.json`, options)
  );

  const handleCofirmModal = async () => {
    await mutate();
    closeModal();
  };


  const { id: firstHeader, username: usernameHeader, ...restHeaders } = headers;
  const { id: firstData, username, ...restData } = userState;

  const rowCount = Object.keys(restData).length;

  const entriesWithHeader = Object.entries(restData).map(([key, value]) => {
    if (typeof value === "boolean") {
      value = value ? "Y" : "N";
    }
    return {
      header: restHeaders[key],
      value: value,
    };
  });

  return (
    <>
    <Modal isOpen={isOpen} closeModal={closeModal}>
    <h2 className={styles["modal-header"]}>
          <img
            src={UserManagementSVG}
            style={{ width: "24px", height: "24px" }}
          />
          <h5>회원 관리 상세페이지</h5>
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>{userState.name}</h2>님 ({userState.id}) <h4>상세페이지</h4>
        </div>
        <Table columCount={2} rowCount={rowCount} maxRowCount={rowCount}>
          <TableRow>
            <TableCell isHeader={true}>{firstHeader}</TableCell>
            <TableCell isHeader={true}>{firstData}</TableCell>
          </TableRow>
          {entriesWithHeader.map(({ header, value }) => (
            <TableRow key={header}>
              <TableCell>{header}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </Table>
        <div style={{ display: "flex", justifyContent: "end", padding: "8px" }}>
          <ConfirmationModal
            onConfirm={handleCofirmModal}
            completeText={
              isMutating
                ? "탈퇴중..."
                : `회원번호 ${userState.id} ( ${userState.name} 님 ) 이 탈퇴되었습니다.`
            }
            content={`회원번호 ${userState.id} ( ${userState.name} 님 ) 을 \n 탈퇴시키시겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button color="var(--main-color)">회원 탈퇴 </Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
    </Modal>
    </>
  );
};

export default AdminMemberManagementModal;
