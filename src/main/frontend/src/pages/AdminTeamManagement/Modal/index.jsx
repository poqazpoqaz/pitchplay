import Modal from "../../../components/Modal/Modal";
import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Button from "../../../components/Button";
import TeamManagementSVG from "../../../../public/icons/teamManage.svg";
import styles from "./index.module.css";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import axios from "axios";
import useMutate from "../../../api/useMutate";

const headers = {
  teamId: "팀아이디",
  teamName: "팀이름",
  teamOwnerUserId: "팀오너회원번호",
  createdAt: "팀생성일",
  members: "팀원",
};

const AdminTeamManagementModal = ({teamState, isOpen, closeModal}) => {
  const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.put(`/data/api/teamData.json`, options)
  );

  const handleCofirmModal = () => {
    mutate({ id: teamState.teamId });
    closeModal();
  };
  const {
    teamId: firstHeader,
    members: membersHeader,
    ...restHeaders
  } = headers;

  const { teamId: firstData, members: membersData, ...restData } = teamState;

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
            src={TeamManagementSVG}
            style={{ width: "24px", height: "24px" }}
          />
          <p>팀 관리 상세페이지</p>
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>팀 ID</h2> ({teamState.teamId}) <h4>상세페이지</h4>
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
        <Table columCount={2} rowCount={2} maxRowCount={1}>
          <TableRow>
            <TableCell isHeader={true}>{membersHeader}</TableCell>
            <TableCell isHeader={true}></TableCell>
          </TableRow>
          <TableRow>
            {membersData && membersData.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableRow>

        </Table>
        <div style={{ display: "flex", justifyContent: "end", padding: "8px" }}>
          <ConfirmationModal
            onConfirm={handleCofirmModal}
            completeText={
              isMutating
                ? "해체중..."
                : `팀아이디 ${teamState.teamId} ( ${teamState.teamName} ) 이 해체되었습니다.`
            }
            content={`팀아이디 ${teamState.teamId} ( ${teamState.teamName} ) 을\n해체 시키시겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button color="var(--main-color)">팀 해체</Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
      </Modal>
    </>
  );
};

export default AdminTeamManagementModal;
