import Modal from "../../../components/Modal/Modal";
import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Button from "../../../components/Button";
import StadiumReservationSVG from "../../../../public/icons/stadiumReservation.svg";
import styles from "./index.module.css";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import axios from "axios";
import useMutate from "../../../api/useMutate";

const headers = {
  reservationNumber: "구장 예약번호",
  collectionNumber: "매칭번호",
  reserverName: "예약자 이름",
  reserverMemberId: "예약자 회원 번호",
  stadium: "경기장",
  stadiumAddress: "경기장 주소",
  collectionTime: "경기일시",
  reservationDateTime: "예약일시",
  paymentId: "결제번호",
  amount: "금액",
  isCanceled: "취소여부",
};

const AdminStadiumReservationModal = ({isOpen, closeModal, reservationState}) => {
  const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.put(`/data/api/stadiumReservationData.json`, options)
  );

  const handleConfirmModal = async () => {
    await mutate();
    closeModal();
  };

  const { reservationNumber: firstHeader, ...restHeaders } = headers;
  const { reservationNumber: firstData, ...restData } = reservationState;

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
            src={StadiumReservationSVG}
            style={{ width: "24px", height: "24px" }}
          />
          <p>구장 예약 상세페이지</p>
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>구장 예약</h2> ({reservationState.reservationNumber}) <h4>상세페이지</h4>
        </div>
        <Table columCount={2} rowCount={rowCount} maxRowCount={rowCount}>
          <TableRow>
            <TableCell isHeader={true}>{firstHeader}</TableCell>
            <TableCell isHeader={true}>{firstData}</TableCell>
          </TableRow>
          {entriesWithHeader.map(({ header, value}) => (
            <TableRow key={value}>
              <TableCell>{header}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </Table>
        <div style={{ display: "flex", justifyContent: "end", padding: "8px" }}>
          <ConfirmationModal
            onConfirm={handleConfirmModal}
            completeText={
              isMutating
                ? "취소중..."
                : `구장예약 ( ${reservationState.reservationNumber} ) 이 취소되었습니다.`
            }
            content={`구장예약 ( ${reservationState.reservationNumber} ) 을 \n 취소시키겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button color="var(--main-color)">예약 취소</Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
      </Modal>
    </>
  );
};

export default AdminStadiumReservationModal;
