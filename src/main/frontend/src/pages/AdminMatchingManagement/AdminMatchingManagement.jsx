import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./MatchingManagement.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminMatchingManagementModal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStore as MatchingStore } from "../../stores/MatchingStore/useStore";
import { formattedDate } from "../../utils/formattedDate";
import Dropdown from "../../components/Dropdown";

const headers = ["매칭번호", "매치타입", "경기종류", "날짜", "마감여부"];
const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminMatchingManagement = () => {
  const { state: matchingState, actions: matchingActions } = MatchingStore();
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [dataList, setDataList] = useState([]);
  const [stadiumData, setStadiumData] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // 모달 
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 선택 값
  const [selectedMatchType, setSelectedMatchType] = useState(null);
  const [selectedMatchSize, setSelectedMatchSize] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const teamOptions = ["팀", "소셜"];
  const matchOptions = ["4vs4", "5vs5", "6vs6", "7vs7", "11vs11"];
  const monthOptions = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  useEffect(() => {
    const fetchStadiumData = async () => {
      try {
        const stadiumResponse = await axios.get('/data/stadiumData.json');
        if (stadiumResponse.data) {
          setStadiumData(stadiumResponse.data);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchStadiumData();
  }, []);

  // 데이터가 최초 로드될 때만 실행되도록 설정
  useEffect(() => {
    if (stadiumData.length > 0) {
      const fetchData = async () => {
        try {
          const matchingResponse = await axios.get('/data/matchingData.json');
          const socialResponse = await axios.get('/data/socialData.json');

          const matchingData = matchingResponse.data;
          const socialData = socialResponse.data;

          const updatedMatchingData = matchingData?.map((matchingItem) => {
            const location = stadiumData.find(stadium => stadium.SVCID === matchingItem.stadiumId) || "Unknown";
            const isClosed = matchingItem.teams.team1.name && matchingItem.teams.team2.name ? "Y" : "N";
            return {
              ...matchingItem,
              location: location,
              matchingType: "팀",
              isClosed: isClosed
            };
          }) || [];

          const updatedSocialData = socialData?.map((socialItem) => {
            const location = stadiumData.find(stadium => stadium.SVCID === socialItem.stadiumId) || "Unknown";
            const isClosed = socialItem.currentMember.length === socialItem.totalMember ? "Y" : "N";
            return {
              ...socialItem,
              location: location,
              matchingType: "소셜",
              isClosed: isClosed
            };
          }) || [];

          setDataList([...updatedMatchingData, ...updatedSocialData]);
        } catch (error) {
          console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        }
      };

      fetchData();
    }
  }, [stadiumData]);

  // currentPage가 바뀔 때마다 currentDataList 업데이트
  useEffect(() => {
    if (dataList.length > 0) {
      let filteredData = dataList;
    
      // 매치타입 필터링
      if (selectedMatchType) {
        filteredData = filteredData.filter(data => data.matchingType === selectedMatchType);
      }
  
      // 경기종류 필터링
      if (selectedMatchSize) {
        filteredData = filteredData.filter(data => data.teamSize === selectedMatchSize || data.socialSize === selectedMatchSize);
      }
  
    // 월 필터링
    if (selectedMonth) {
      const monthIndex = monthOptions.indexOf(selectedMonth) + 1;
      filteredData = filteredData.filter(data => {
        const date = data.matchingDate ? new Date(data.matchingDate) : null;
        const socialDate = data.socialTime ? new Date(data.socialTime) : null;

        // 날짜가 매칭 날짜라면 (팀 데이터), 또는 소셜 타임이면 (소셜 데이터)
        return (date && date.getMonth() + 1 === monthIndex) || (socialDate && socialDate.getMonth() + 1 === monthIndex);
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
  }, [currentPage, dataList, selectedMatchType, selectedMatchSize, selectedMonth, totalPages]);

  useEffect(() => {
    // 데이터 로딩이 완료되었을 때 현재 페이지가 1이 아니면 페이지를 1로 리셋
    if (currentPage !== 1) {
      navigate("?page=1");
    }
  }, [selectedMatchType, selectedMatchSize, selectedMonth]);

 

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleItemClick = (matchingNum) => {
    const selectedItem = dataList.find(item => 
      item.matchingType === "팀" ? item.matchingNum === matchingNum : item.socialNumber === matchingNum
    );

    if (selectedItem) {
      const { matchingType, matchingNum, socialNumber, stadiumId, teams, teamSize, socialSize, socialTime, matchingDate } = selectedItem;
      const isClosed = selectedItem.isClosed === "Y" ? "마감" : "진행중";
      const date = matchingType === "팀" ? matchingDate.split(" ")[0] : socialTime.split("T")[0];
      const time = matchingType === "팀" ? matchingDate.split(" ")[1] : socialTime.split("T")[1].substring(0, 5);
      const location = stadiumData.find(stadium => stadium.SVCID === stadiumId)?.SVCNM || "경기장 정보 없음";

      matchingActions.updateAllFields({
        id: matchingType === "팀" ? matchingNum : socialNumber,
        matchType: matchingType,
        teamSize: matchingType === "팀" ? teamSize : socialSize,
        gender: matchingType === "팀" ? selectedItem.gender : selectedItem.socialGender,
        date,
        time,
        location,
        isClosed,
        teams: matchingType === "팀" ? teams : selectedItem.currentMember,
      });

      setIsOpen(true);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <h2>매칭 관리</h2>
        <div>
          <Dropdown 
            text="매치타입"
            options={teamOptions}
            selected = {selectedMatchType}
            onChange={(value) => setSelectedMatchType(value)}
          />
          <Dropdown
            text="경기종류"
            options={matchOptions}
            selected = {selectedMatchSize}
            onChange={(value) => setSelectedMatchSize(value)}
          />
          <Dropdown
            text="월"
            options={monthOptions}
            selected = {selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
          />
        </div>
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
            <TableRow key={index} onClick={() => handleItemClick(data.matchingType === "팀" ? data.matchingNum : data.socialNumber)}>
              <TableCell>{data.matchingType === "팀" ? data.matchingNum : data.socialNumber}</TableCell>
              <TableCell>{data.matchingType === "팀" ? data.matchingType : data.matchingType}</TableCell>
              <TableCell>{data.matchingType === "팀" ? data.teamSize : data.socialSize}</TableCell>
              <TableCell>{data.matchingType === "팀" ? formattedDate(data.matchingDate) : formattedDate(data.socialTime)}</TableCell>
              <TableCell>{data.isClosed === "Y" ? "Y" : "N"}</TableCell>
            </TableRow>
          ))}
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <AdminMatchingManagementModal 
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        matchingState={matchingState}
      />

    </>
  );
};

export default AdminMatchingManagement;