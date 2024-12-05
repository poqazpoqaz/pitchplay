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

  const handleItemClick = async (matchingNum) => {
    try {
      // 세 개의 데이터를 병렬로 불러오기
      const [matchingResponse, socialResponse, stadiumResponse] = await Promise.all([
        axios.get("/data/matchingData.json"),
        axios.get("/data/socialData.json"),
        axios.get("/data/stadiumData.json") 
      ]);
  
      // 각 데이터의 내용을 가져오기
      const matchingDatas = matchingResponse.data;
      const socialDatas = socialResponse.data;
      const stadiumDatas = stadiumResponse.data; 
 
      // matchingData에서 해당 matchingNum에 맞는 데이터 찾기
      const selectedMatching = matchingDatas.find(data => data.matchingNum === matchingNum);
  
      // socialData에서 해당 matchingNum에 맞는 데이터 찾기
      const selectedSocial = socialDatas.find(data => data.socialNumber === matchingNum);
  
      // stadiumData에서 해당 stadiumId에 맞는 경기장 정보 찾기
      const getStadiumName = (stadiumId) => {
        const selectedStadium = stadiumDatas.find(stadium => stadium.SVCID === stadiumId);
        return selectedStadium ? selectedStadium.SVCNM : "경기장 정보 없음"; 
      };
  

      if (selectedMatching) {
        const matchingDateString = selectedMatching.matchingDate; 
        const isClosed = selectedMatching.teams.team1 && selectedMatching.teams.team2 ? "마감" : "진행중";
        const [date, time] = matchingDateString.split(" ");  // "2024-12-23", "15:30"

        let result; 

        result = {
          date: date, 
          time: time  
        };

        matchingActions.updateAllFields({
          id: selectedMatching.matchingNum,
          matchType: "팀", 
          teamSize: selectedMatching.teamSize,  // 팀 크기
          gender: selectedMatching.gender,  // 성별
          date: result.date,  
          time: result.time,
          location: getStadiumName(selectedMatching.stadiumId),  // 경기장 이름 찾기
          isClosed: isClosed,// 마감 여부
          teams: selectedMatching.teams  // 참가 팀
        });
      } else if (selectedSocial) {
        // socialData를 사용할 경우
        const matchingDateString = selectedSocial.socialTime; 
        const date = matchingDateString.split("T")[0];  // "2024-11-25"
        const time = matchingDateString.split("T")[1].split(":")[0] + ":" + matchingDateString.split("T")[1].split(":")[1];  // "20:00"
       
        let result; 

        result = {
          date: date,  // "2024-11-25"
          time: time   // "20:00"
        };

        const isClosed = selectedSocial.currentMember.length == selectedSocial.totalMember ? "마감" : "진행중";

        matchingActions.updateAllFields({
          id: selectedSocial.socialNumber,
          matchType: "소셜",  // 소셜 데이터의 매칭 타입
          teamSize: selectedSocial.socialSize, // 경기 종류
          gender: selectedSocial.socialGender, // 성별
          date: result.date,  // 경기 날짜
          time: result.time,  // 경기 시간
          location: getStadiumName(selectedSocial.stadiumId), // 경기장 이름 찾기
          isClosed: isClosed, // 마감 여부
          reservationedMembers:  selectedSocial.nickname,// 예약 회원
          teams: selectedSocial.currentMember.length // 참여 한 수
        });
      }


    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }

    setIsOpen(true);
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