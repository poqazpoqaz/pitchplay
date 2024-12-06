import React, { useState, useEffect } from "react";
import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./PaymentManagement.module.css";
import Pagination from "../../components/Pagination/Pagination";
import PaymentButtons from "./components/PaymentButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore as PaymentStore } from "../../stores/PaymentStore/useStore";
import axios from "axios";
import Dropdown from "../../components/Dropdown";
import {formattedDate , formatCurrency} from "../../utils/formattedDate";
import AdminPaymentManagementModal from "./Modal/index";

const headers = ["결제번호", "이름", "결제방법", "결제일시", "거래구분"];
const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminPaymentManagement = () => {
  const { state: paymentState, actions: paymentActions } = PaymentStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [dataList, setDataList] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [refundData, setRefundData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("결제관리");
  
  // 모달 
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 선택 값 및 입력 필드 값
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthOptions = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const categoryOptions = selectedMethod === "결제관리"? ["취소", "성공"]: ["환불대기", "완료"];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 데이터 가져오기 (예: userData.json 파일에서)
        const userResponse = await axios.get("/data/userData.json");
        if (userResponse.data) {
          setUserData(userResponse.data);
        }

        if (selectedMethod === "결제관리") {
          // 결제 데이터 가져오기
          const paymentResponse = await axios.get("/data/paymentData.json");
          if (paymentResponse.data) {
            setPaymentData(paymentResponse.data);
          }
        } else if (selectedMethod === "환불관리") {
          // 환불 데이터 가져오기
          const refundResponse = await axios.get("/data/refundData.json");
          if (refundResponse.data) {
            setRefundData(refundResponse.data);
          }
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [selectedMethod]); // selectedMethod가 변경될 때마다 데이터를 다시 가져옵니다.

  useEffect(() => {
    if (userData.length) {
      let mergedData = [];
  
      if (selectedMethod === "결제관리" && paymentData.length) {
        // 결제 데이터를 가져오는 로직
        mergedData = paymentData.map((data) => {
          const user = userData.find((user) => user.id === data.userId);
  
          return {
            orderId: data.orderId,
            username: user ? user.name : "알 수 없음",
            userId: user ? user.id : "알 수 없음",
            phone: user ? user.phone : "알 수 없음",
            email: user ? user.email : "알 수 없음",
            paymentAmount: formatCurrency(data.amount),
            paymentMethod: data.paymentMethod,
            paymentDate: formattedDate(data.paymentDate),
            paymentStatus: data.paymentStatus,
          };
        });
      } else if (selectedMethod === "환불관리" && refundData.length) {
        // 환불 데이터를 가져오는 로직
        mergedData = refundData.map((data) => {
          const user = userData.find((user) => user.id === data.userId);
  
          return {
            orderId: data.orderId,
            username: user ? user.name : "알 수 없음",
            userId: user ? user.id : "알 수 없음",
            phone: user ? user.phone : "알 수 없음",
            email: user ? user.email : "알 수 없음",
            paymentAmount: formatCurrency(data.refundAmount),
            paymentMethod: data.refundtype,
            paymentDate: formattedDate(data.paymentDate),
            paymentStatus: data.refundStatus,
          };
        });
      }
  
      // 필터링 로직 추가
      if (selectedCategory) {
        mergedData = mergedData.filter((data) => {
          if (selectedMethod === "결제관리") {
            // 결제관리에서만 거래구분 필터링
            return data.paymentStatus === selectedCategory;
          } else if (selectedMethod === "환불관리") {
            // 환불관리에서만 거래구분 필터링
            return data.paymentStatus === selectedCategory;
          }
          return true;
        });
      }
  
      if (selectedMonth) {
        // 결제월 필터링
        mergedData = mergedData.filter((data) => {
          const paymentDate = new Date(data.paymentDate);
          const month = paymentDate.getMonth() + 1; // JavaScript의 월은 0부터 시작하므로 +1
          return month === parseInt(selectedMonth);
        });
      }
  
      // 필터링된 데이터를 페이지 단위로 나누기
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = currentPage * PAGE_SIZE;
      const pageData = mergedData.slice(startIndex, endIndex);
  
      setDataList(pageData);
  
      // 필터링된 데이터의 총 페이지 수 계산
      const totalPages = Math.ceil(mergedData.length / PAGE_SIZE);
      setTotalPages(totalPages);
    }
  }, [paymentData, refundData, userData, selectedMethod, selectedCategory, selectedMonth, currentPage]);
       
  
  useEffect(() => {
    // 데이터 로딩이 완료되었을 때 현재 페이지가 1이 아니면 페이지를 1로 리셋
    if (currentPage !== 1) {
      navigate("?page=1");
    }
  }, [selectedMethod, selectedCategory, selectedMonth]);

  useEffect(() => {
    // 결제관리 또는 환불관리 선택 시 드롭다운 항목 초기화
    setSelectedCategory(null);
    setSelectedMonth(null);
  }, [selectedMethod]);


  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleClickItem = (orderId) => {
    if (selectedMethod === "결제관리") {
      const selectedPayment = dataList.find(data => data.orderId === orderId);
      if (selectedPayment) {
        paymentActions.updateAllFields({
          orderId: selectedPayment.orderId,
          name: selectedPayment.username,
          memberId: selectedPayment.userId, 
          phoneNumber: selectedPayment.phone,
          email: selectedPayment.email,
          amount: selectedPayment.paymentAmount,
          paymentMethod: selectedPayment.paymentMethod,
          requestDateTime: selectedPayment.paymentDate,
          transactionType: selectedPayment.paymentStatus
        });
      } else {
        console.log("결제 관리 항목을 찾을 수 없습니다.");
      }
    }
    
    if (selectedMethod === "환불관리") {
      const selectedRefund = dataList.find(data => data.orderId === orderId);
      if (selectedRefund) {
        paymentActions.updateAllFields({
          orderId: selectedRefund.orderId,
          name: selectedRefund.username,
          memberId: selectedRefund.userId, 
          phoneNumber: selectedRefund.phone,
          email: selectedRefund.email,
          amount: selectedRefund.paymentAmount,
          paymentMethod: selectedRefund.paymentMethod,
          requestDateTime: selectedRefund.paymentDate,
          transactionType: selectedRefund.paymentStatus
        });
      } else {
        console.log("환불 관리 항목을 찾을 수 없습니다.");
      }
    }
  
    setIsOpen(true);
  };


  return (
    <>
      <div className={styles["container"]}>
        <PaymentButtons
          value={selectedMethod}
          onChangeValue={setSelectedMethod}
          gridArea="title"
        />
        <div>
          <Dropdown
            options={categoryOptions}
            selected={selectedCategory}
            onChange={setSelectedCategory}
            text="거래구분"
            gridArea="inp1"
          />
          <Dropdown
            options={monthOptions}
            selected={selectedMonth}
            onChange={setSelectedMonth}
            text="결제월"
            gridArea="inp2"
          />
        </div>
        <div className={styles["table-pagination-container"]}>
          <Table columCount={5} rowCount={15}>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} isHeader={true}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
            {dataList.map((data) => (
              <TableRow key={data.orderId} onClick={() => handleClickItem(data.orderId)}>
                <TableCell>{data.orderId}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.paymentMethod}</TableCell>
                <TableCell>{data.paymentDate}</TableCell>
                <TableCell>{data.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <AdminPaymentManagementModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        paymentState={paymentState}
        paymentActions={paymentActions}
        title={selectedMethod}
        /> 
      </div>
    </>
  );
};

export default AdminPaymentManagement;
