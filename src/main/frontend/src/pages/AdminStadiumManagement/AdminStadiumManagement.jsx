import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./StadiumReservation.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminStadiumReservationModal from "./Modal/index";
import axios, { isCancel } from "axios";
import { useState, useEffect } from "react";
import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import Dropdown from "../../components/Dropdown";
import { formattedDate } from "../../utils/formattedDate";
import Input from "../../components/Input";
import Button from "../../components/Button";

const headers = ["예약번호", "경기장", "경기일시", "매칭타입", "취소여부"];
const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminStadiumReservation = () => {
  const { state: reservationState, actions: reservationActions } = ReservationStore();

  const monthOptions = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [dataList, setDataList] = useState([]);
  const [stadiumData, setStadiumData] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
 
    // 드롭다운 선택 값 및 입력 필드 값
    const [text, setText] = useState(null);
    const [reservationNumber, setReservationNumber] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

  // 모달 
  const [isOpen, setIsOpen] = useState(false);
      
  const handleClick = () => {
    setReservationNumber(text)
  }

    useEffect(() => {
      // 예약 데이터 로드
      axios.get("/data/reservationData.json")
        .then(response => {
          setDataList(response.data);
        });
  
      // 경기장 데이터 로드
      axios.get("/data/stadiumData.json")
        .then(response => {
          setStadiumData(response.data);
        });
    }, []);
  
    useEffect(() => {
      if (dataList.length > 0 && stadiumData.length > 0) {
        let updatedData = dataList.map(reservation => {
          // 경기장 이름 찾기
          const stadium = stadiumData.find(stadium => stadium.SVCID === reservation.stadiumId);
          const stadiumName = stadium ? stadium.SVCNM : "미정";
  
          // 매칭 타입 설정
          let matchType = "소셜";
          if (reservation.teamCode) {
            matchType = "팀";
          }
  
          return {
            reservationNumber: reservation.reservationNumber,
            stadiumName,
            matchType,
            formattedDate: formattedDate(reservation.reservationDate),
            reservationDate: reservation.reservationDate // 원본 날짜 추가
          };
        });
  
        // 검색 조건에 맞게 필터링
        let filteredData = updatedData;
  
        if (reservationNumber) {
          filteredData = filteredData.filter(data => data.reservationNumber.toString() === reservationNumber);
        }
  
        if (selectedMonth) {
          const monthNumber = monthOptions.indexOf(selectedMonth) + 1; // 선택된 월을 숫자로 변환
          filteredData = filteredData.filter(data => new Date(data.reservationDate).getMonth() + 1 === monthNumber);
        }
  
        // 페이지에 맞게 데이터 필터링
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = currentPage * PAGE_SIZE;
        const pageData = filteredData.slice(startIndex, endIndex);
        setCurrentDataList(pageData);
  
        // 총 페이지 수 계산
        const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
        setTotalPages(totalPages);
      }
    }, [dataList, stadiumData, currentPage, reservationNumber, selectedMonth]);
    
    useEffect(() => {
      // 데이터 로딩이 완료되었을 때 현재 페이지가 1이 아니면 페이지를 1로 리셋
      if (currentPage !== 1) {
        navigate("?page=1");
      }
    }, [reservationNumber, selectedMonth]);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleItemClick = async(reservationNumber) => {
  try {
    const [reservationReponse, teamResponse, collectionResponse, userResponse, stadiumResponse, paymentResponse]  = await Promise.all([
      axios.get("/data/reservationData.json"),
      axios.get("/data/teamData.json"),
      axios.get("/data/collectionsData.json"), 
      axios.get("/data/userData.json"),
      axios.get("/data/stadiumData.json"),
      axios.get("/data/paymentData.json")
    ]);

    const reservationDatas = reservationReponse.data;
    const teamDatas = teamResponse.data;
    const collectionDatas = collectionResponse.data;
    const userDatas = userResponse.data;
    const stadiumDatas = stadiumResponse.data;
    const paymentDatas = paymentResponse.data;

    const selectedReservation = reservationDatas.find(data => data.reservationNumber == reservationNumber);

    if(!selectedReservation) return;

    let userNickname = null ;
    let userId = null; 

    if(selectedReservation.teamCode){
      const selectedTeam = teamDatas.find(data => data.teamCode == selectedReservation.teamCode);
      userId = selectedTeam.teamOwner? selectedTeam.teamOwner : null;

      const selectedUser = userDatas.find(data => data.id == selectedTeam.teamOwner);
      userNickname = selectedUser.nickname;
    }

    if(selectedReservation.userId){
      const selectedUser = userDatas.find(data => data.id == selectedReservation.userId);
      userNickname = selectedUser.nickname? selectedUser.nickname : null;
    }

    let collectionTime = null; 

    if(selectedReservation.collectionNumber){
      const selectedCollection = collectionDatas.find(data => data.collectionNumber == selectedReservation.collectionNumber);
      collectionTime = selectedCollection.collectionTime? formattedDate(selectedCollection.collectionTime) :null;
    }

    let stadiumName = null; 
    let stadiumAddress = null; 

    if(selectedReservation.stadiumId){
      const selectedStadium = stadiumDatas.find(data => data.SVCID == selectedReservation.stadiumId);
      stadiumName = selectedStadium.SVCNM ?selectedStadium.SVCNM : null;
      stadiumAddress = selectedStadium.PLACENM? selectedStadium.PLACENM: null;
    }
    
    let paymentId = null;
    let amount = null; 

    if(selectedReservation.reservationNumber){
      const selectedPayment = paymentDatas.find(data => data.reservationNumber == selectedReservation.reservationNumber);
      paymentId = selectedPayment.orderId? selectedPayment.orderId: null;
      amount = selectedPayment.amount? selectedPayment.amount : null; 
    }
    
    reservationActions.updateAllFields({
      reservationNumber: selectedReservation.reservationNumber,
      collectionNumber: selectedReservation.collectionNumber, 
      reserverName : userNickname,
      reserverMemberId: selectedReservation.userId || userId, 
      stadium: stadiumName,
      stadiumAddress: stadiumAddress,
      collectionTime: collectionTime,
      reservationDateTime:formattedDate(selectedReservation.reservationDate),
      paymentId: paymentId,
      amount: amount,
      isCanceled: selectedReservation.isCanceled ? "Y" : "N"
    })
  }catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
  }

  setIsOpen(true);
}

  return (
    <>
      <div className={styles["container"]}>
          <h2>구장 예약</h2>
          <div>
           <Input
              size="xsmall"
              placeholder="예약번호"
              onChange={(e) => setText(e.target.value)}
              gridArea="inp1"
            />
            <Dropdown
                options={monthOptions}
                selected={selectedMonth}
                onChange={setSelectedMonth}
                text="생성월"
                gridArea="inp2"
              />
            <Button 
              color="var(--main-color)"
              size="large"
              gridArea="btn"
              onClick={handleClick}
            >검색</Button>
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
            {currentDataList.map((data, index) => (
              <TableRow key={index} onClick={() => handleItemClick(data.reservationNumber)}>
                <TableCell>{data.reservationNumber}</TableCell>
                <TableCell>{data.stadiumName}</TableCell>
                <TableCell>{data.formattedDate}</TableCell>
                <TableCell>{data.matchType}</TableCell>
                <TableCell>{data.isCanceled ? "Y" : "N"}</TableCell>
              </TableRow>
            ))}
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <AdminStadiumReservationModal
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            reservationState={reservationState}   />
    </>
  );
};

export default AdminStadiumReservation;
