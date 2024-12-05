import Modal from "../../../components/Modal/Modal";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Button from "../../../components/Button";
import UserManagementSVG from "../../../../public/icons/usermanage.svg";
import styles from "./index.module.css";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import useFetch from "../../../api/useFetch";
import axios from "axios";
import useMutate from "../../../api/useMutate";


const headers = {
  id: "회원번호",
  userId: "유저아이디",
  email: "이메일",
  role: "권한",
  username: "유저이름",
  nickname: "닉네임",
  hasTeam: "팀소유여부",
  teamId: "팀아이디",
  phoneNumber: "전화번호",
  location: "지역",
  createdAt: "가입일",
  remainedCash: "잔액",
  accountNumber: "계좌번호",
  isDeleted: "탈퇴여부",
};

const AdminMemberManagementModal = () => {
  const path = useLocation().pathname;
  const params = useParams().id;
  const openModal = !!params;
  const navigate = useNavigate();
  const { data, isLoading } = useFetch(() =>
    axios.get(`/data/api/memberData.json`)
  );

  const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.delete(`/data/api/memberData.json`, options)
  );

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  const handleCofirmModal = async () => {
    await mutate();
  };

  const handleMainModalClose = () => {
    const prevPath = path.split("/").slice(0, -1).join("/");
    navigate(prevPath);
  };

  const { id: firstHeader, username: usernameHeader, ...restHeaders } = headers;
  const { id: firstData, username, ...restData } = data;

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
      <Modal isOpen={openModal} closeModal={handleMainModalClose}>
        <h2 className={styles["modal-header"]}>
          <img
            src={UserManagementSVG}
            style={{ width: "24px", height: "24px" }}
          />
          <h5>회원 관리 상세페이지</h5>
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>{username}</h2>님 ({data.id}) <h4>상세페이지</h4>
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
                : `회원번호 ${data.id} ( ${data.username} 님 ) 이 탈퇴되었습니다.`
            }
            content={`회원번호 ${data.id} ( ${data.username} 님 ) 을 \n 탈퇴시키시겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button>회원 탈퇴 </Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
      </Modal>
    </>
  );
};

export default AdminMemberManagementModal;
