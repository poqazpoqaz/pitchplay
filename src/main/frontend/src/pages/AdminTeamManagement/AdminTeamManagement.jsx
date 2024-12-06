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
  const { state: teamState, actions: teamActions } = TeamStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [teamData, setTeamData] = useState([]); // 원본 데이터
  const [currentDataList, setCurrentDataList] = useState([]); // 현재 페이지 데이터
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);

  // 검색 필드
  const [text, setText] = useState("");
  const [teamCode, setTeamCode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const PAGE_SIZE = 15; // 페이지당 데이터 수
  const headers = ["팀 ID", "팀 이름", "팀관리자", "팀 생성일"];

  // 현재 연도부터 10년 전까지의 년도 배열
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, index) => currentYear - index);

  // 페이지 이동 처리
  const handlePageChange = (page) => navigate(`?page=${page}`);

  // 검색 버튼 클릭
  const handleClick = () => setTeamCode(text);

  // 팀 코드로 특정 데이터 선택
  const handleClickItem = (teamCode) => {
    const selectedData = teamData.find((data) => data.teamCode === teamCode);

    if (selectedData) {
      teamActions.updateAllFields({
        teamId: selectedData.teamCode,
        teamName: selectedData.teamName,
        teamOwnerUserId: selectedData.teamOwner,
        createdAt: formattedDate(selectedData.teamCreatedDate),
        members: selectedData.teamMember,
      });
      setIsOpen(true);
    } else {
      console.log("팀을 찾을 수 없습니다.");
    }
  };

  // 데이터를 필터링 및 페이지 처리하는 함수
  const filterAndPaginateData = () => {
    let filteredData = teamData;

    // 팀 코드 필터링
    if (teamCode) {
      filteredData = filteredData.filter((data) => data.teamCode === teamCode);
    }

    // 생성 연도 필터링
    if (selectedYear) {
      filteredData = filteredData.filter((data) => {
        const createdYear = new Date(data.teamCreatedDate).getFullYear();
        return createdYear === selectedYear;
      });
    }

    // 페이지 단위 데이터 분리
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = currentPage * PAGE_SIZE;
    const pageData = filteredData.slice(startIndex, endIndex);

    setCurrentDataList(pageData);
    setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
  };

  // 초기 데이터 가져오기
  useEffect(() => {
    axios.get("/data/teamData.json")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          teamCreatedDate: formattedDate(item.teamCreatedDate), // 미리 포맷팅
        }));
        setTeamData(formattedData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  // 필터링 및 페이지 처리
  useEffect(() => {
    if (teamData.length > 0) {
      filterAndPaginateData();
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
