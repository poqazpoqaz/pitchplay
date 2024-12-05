import Modal from "../../../components/Modal/Modal";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Button from "../../../components/Button";
import MatchingManagementSVG from "../../../../public/icons/matchingmanage.svg";
import styles from "./index.module.css";
import SelectorList, { Selector } from "../../../components/Accordion/SelectorList";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import useFetch from "../../../api/useFetch";
import axios from "axios";
import useMutate from "../../../api/useMutate";

import { useState } from "react";

const headers = {
  id: "매칭번호",
  reservationId: "구장 예약번호",
  postNumber: "게시글 번호",
  matchType: "매치타입",
  gameType: "경기종류",
  gender: "성별",
  date: "경기 날짜",
  time: "경기 시간",
  location: "경기장",
  isClosed: "마감여부",
  isCanceled: "취소여부",
  reservationedMembers: "예약회원",
  teams: "참가팀",
};

const AdminMatchingManagementModal = () => {
  const path = useLocation().pathname;
  const params = useParams().id;
  const openModal = !!params;
  const navigate = useNavigate();

  const [reservationMember, setReservationMember] = useState([]);

  const { data, isLoading } = useFetch(() =>
    axios.get("/data/reservationData.json")
  );

  const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.put(`/data/reservationData.json`, options)
  );

  if (isLoading) return <div>loading...</div>;

  const handleMainModalClose = () => {
    const prevPath = path.split("/").slice(0, -1).join("/");
    navigate(prevPath);
  };

  const handleConfirmModal = () => {
    mutate({ id: data.id });
  };

  const {
    id: firstHeader,
    teams: teamsHeader,
    reservationedMembers: reservationedMembersHeader,
    ...restHeaders
  } = headers;
  const {
    id: firstData,
    teams: teamsData,
    reservationedMembers: reservationedMembersData,
    ...restData
  } = data;

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
        {/* <h2 className={styles["modal-header"]}>
          <img
            src={MatchingManagementSVG}
            style={{ width: "24px", height: "24px" }}
          />
          <h5>팀 매칭 상세페이지</h5>
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>팀 매칭</h2> ({firstData}) <h4>상세페이지</h4>
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
          <TableRow>
            <TableCell>{reservationedMembersHeader}</TableCell>
            <TableCell style={{ marin: "0", padding: "0" }}>
              <SelectorList>
                <Selector
                  initValue={reservationedMembersData[0]}
                  values={reservationedMembersData}
                  onChangeValue={(value) => setReservationMember(value)}
                  headerClassName={styles["selector-header"]}
                  contentClassName={styles["selector-content"]}
                />
              </SelectorList>
            </TableCell>
          </TableRow>
        </Table>
        <Table columCount={1} rowCount={3} maxRowCount={3}>
          <TableRow>
            <TableCell isHeader={true}>{teamsHeader}</TableCell>
          </TableRow>
          {teamsData.map((team) => (
            <TableRow key={team}>
              <TableCell>{team}</TableCell>
            </TableRow>
          ))}
        </Table>
        <div style={{ display: "flex", justifyContent: "end", padding: "8px" }}>
          <ConfirmationModal
            onConfirm={handleConfirmModal}
            completeText={
              isMutating
                ? "취소중..."
                : `팀 / 소셜 매칭 ( ${data.id} ) 가 취소되었습니다.`
            }
            content={`팀 / 소셜 매칭 ( ${data.id} ) 을 \n 취소시키시겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button>매칭 취소</Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div> */}
      </Modal>
    </>
  );
};

export default AdminMatchingManagementModal;
