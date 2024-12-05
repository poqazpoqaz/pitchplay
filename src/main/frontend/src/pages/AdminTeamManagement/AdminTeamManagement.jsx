import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./TeamManagement.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminTeamManagementModal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import {useStore as TeamStore} from "../../stores/TeamStore/useStore";
import Dropdown from "../../components/Dropdown";
import { formattedDate } from "../../utils/formattedDate";
import Input from "../../components/Input";
import Button from "../../components/Button";

const headers = ["팀 ID", "팀 이름", "팀관리자", "팀 생성일"];
const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminTeamManagement = () => {
  const {state: teamState, actions: teamActions} = TeamStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [teamData, setTeamData] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

    // 모달 
    const [isOpen, setIsOpen] = useState(false);

  // 현재 연도부터 10년 전까지의 년도 배열 생성
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, index) => currentYear - index);
  
  // 드롭다운 선택 값 및 입력 필드 값
  const [text, setText] = useState("");
  const [teamCode, setTeamCode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleClick = () => {
    setTeamCode(text)
  }

  const handleClickItem = (teamCode) => {
    axios.get("/data/teamData.json")
    .then(response => {
      const datas = response.data;
      const selectedData = datas.find(data => data.teamCode == teamCode);

      if(selectedData){
        teamActions.updateAllFields({
          teamId: selectedData.teamCode, 
          teamName: selectedData.teamName, 
          teamOwnerUserId: selectedData.teamOwner,
          createdAt: formattedDate(selectedData.teamCreatedDate),
          members: selectedData.teamMember
        });
        setIsOpen(true);
      } else{
        console.log("팀을 찾을 수 없습니다.");
      }
    })
    .catch(error => {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    });
  }

  useEffect(() => {
    axios.get("/data/teamData.json")
    .then(response => {
      setTeamData(response.data);
    })
  }, []);

  useEffect(() => {
    if (teamData.length > 0) {
      let filteredData = teamData;
  
      // teamCode 필터링
      if (teamCode !== null && teamCode !== '') {
        filteredData = filteredData.filter(data => data.teamCode === teamCode);
      }
  
      // selectedYear 필터링 (연도가 선택된 경우만)
      if (selectedYear !== null) {
        filteredData = filteredData.filter(data => {
          // data.createdAt이 날짜 형식이라면 연도를 추출
          const createdYear = new Date(data.teamCreatedDate).getFullYear();
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
  }, [currentPage, teamData, teamCode, selectedYear]);

  return (
    <>
      <div className={styles["container"]}>
          <h2>팀 관리</h2>
          <div>
          <Input
              size="xsmall"
              placeholder="팀코드"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Dropdown
              options={yearOptions}
              selected={selectedYear}
              onChange={setSelectedYear}
              text="생성년도"
            />
            <Button 
            color="var(--main-color)"
            size="large"
            gridArea="btn"
            onClick={handleClick}
            >검색</Button>
       </div>
        <div className={styles["table-pagination-container"]}>
          <Table columCount={4} rowCount={15}>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} isHeader={true}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
            {currentDataList.map((data) => (
              <TableRow key={data.teamCode} onClick={() => handleClickItem(data.teamCode)}>
                <TableCell>{data.teamCode}</TableCell>
                <TableCell>{data.teamName}</TableCell>
                <TableCell>{data.teamMember[0].name}</TableCell>
                <TableCell>{formattedDate(data.teamCreatedDate)}</TableCell>
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
      <AdminTeamManagementModal
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            teamState={teamState}  />
    </>
  );
};

export default AdminTeamManagement;
