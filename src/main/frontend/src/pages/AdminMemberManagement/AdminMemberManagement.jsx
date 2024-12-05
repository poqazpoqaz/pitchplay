import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./MemberManagement.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminMemberManagementModal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import Dropdown from "../../components/Dropdown";
import { formattedDate } from "../../utils/formattedDate";
import Input from "../../components/Input";
import Button from "../../components/Button";

const headers = ["회원번호", "아이디", "이름", "계정생성일", "탈퇴여부"];
const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminMemberManagement = () => {
  const { state: userState, actions: userActions } = UserStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [dataList, setDataList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // 드롭다운 선택 값 및 입력 필드 값
  const [text, setText] = useState(null);
  const [memberNumber, setMemberNumber] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // 현재 연도부터 10년 전까지의 년도 배열 생성
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, index) => currentYear - index);
  
  const handleClick = () => {
    setMemberNumber(text)
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const stadiumResponse = await axios.get('/data/userData.json');
        if (stadiumResponse.data) {
          setUserData(stadiumResponse.data);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchUserData();
  }, []);

  // 데이터가 최초 로드될 때만 실행되도록 설정
  useEffect(() => {
    if (userData.length > 0) {
      const fetchData = async () => {
        try {
          const userResponse = await axios.get('/data/userData.json');
          const userData = userResponse.data;
          setDataList(userData);
        } catch (error) {
          console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        }
      };
      fetchData();
    }
  }, [userData]);

  // currentPage가 바뀔 때마다 currentDataList 업데이트
  useEffect(() => {
    if (dataList.length > 0) {
      let filteredData = dataList;

      // memberNumber 필터링
      if (memberNumber !== null) {
        filteredData = filteredData.filter(data => data.userNumber === memberNumber);
      }


    // selectedYear 필터링 (연도가 선택된 경우만)
    if (selectedYear !== null) {
      filteredData = filteredData.filter(data => {
        // data.createdAt이 날짜 형식이라면 연도를 추출
        const createdYear = new Date(data.joindate).getFullYear();
        return createdYear === selectedYear;
      });
    }

      // 필터링된 데이터를 페이지 단위로 나누기
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = currentPage * PAGE_SIZE;
      const pageData = filteredData.slice(startIndex, endIndex);

      setCurrentDataList(pageData);

      // 필터링된 데이터의 총 페이지 수 계산
      const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
      setTotalPages(totalPages);
    }
  }, [currentPage, dataList, memberNumber, selectedYear]);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleItemClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <div className={styles["container"]}>
          <h2>회원 관리</h2>
          <div>
            <Input
              size="xsmall"
              placeholder="회원번호"
              onChange={(e) => setText(e.target.value)}
              gridArea="inp1"
            />
            <Dropdown
              options={yearOptions}
              selected={selectedYear}
              onChange={setSelectedYear}
              text="가입년도"
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
            {currentDataList.map((data) => (
              <TableRow key={data.id} onClick={() => handleItemClick(data.id)}>
                <TableCell>{data.userNumber}</TableCell>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{formattedDate(data.joindate)}</TableCell>
                <TableCell>{data.isDeleted ? "Y" : "N"}</TableCell>
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
      <AdminMemberManagementModal />
    </>
  );
};

export default AdminMemberManagement;