import { Table, TableCell, TableRow } from "../../../components/Table/Table";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button";
import styles from "./index.module.css";
import PaymentSVG from "../../../../public/icons/paymentmanage.svg";
import ConfirmationModal, {
  ConfirmationModalTrigger,
} from "../../../components/ConfirmationModal/index";
import axios from "axios";
import useMutate from "../../../api/useMutate";

const headers = {
  orderId: "결제 번호",
  name: "이름",
  memberId: "회원번호",
  phoneNumber: "핸드폰번호",
  email: "이메일",
  amount: "환불금액 or 결제금액",
  paymentMethod: "결제방법",
  requestDateTime: "요청일시",
  transactionType: "거래구분",
};

const AdminPaymentManagementModal = ({title, isOpen, closeModal, paymentState}) => {
   const { mutate, isLoading: isMutating } = useMutate((options) =>
    axios.put(`/data/api/paymentData.json`, options)
  );

  const handleConfirmModal = () => {
    mutate({ orderId: paymentState.id });
    closeModal();
  };

  const { orderId: idData, ...restData } = paymentState;
  const { orderId: idHeader, ...restHeaders } = headers;

  const rowCount = Object.keys(restData).length;

  const entriesWithHeader = Object.entries(restData).map(([key, value]) => {
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
            src={PaymentSVG}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
          결제 관리 상세페이지
        </h2>
        <div className={styles["modal-sub-header"]}>
          <h2>{title} 관리</h2> ({paymentState.orderId}) <h4>상세페이지</h4>
        </div>
        <Table columCount={2} rowCount={rowCount} maxRowCount={rowCount}>
          <TableRow>
            <TableCell isHeader={true}>{idHeader}</TableCell>
            <TableCell isHeader={true}>{idData}</TableCell>
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
            onConfirm={handleConfirmModal}
            completeText={
              isMutating ? "처리중..." : `${paymentState.orderId} ${title}이 처리되었습니다.`
            }
            content={`${paymentState.orderId} ( ${title}번호 ) 를 \n 처리하시겠습니까?`}
          >
            <ConfirmationModalTrigger>
              <Button color="var(--main-color)">{title} 취소</Button>
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
    </Modal>
    </>
  );
};

export default AdminPaymentManagementModal;
