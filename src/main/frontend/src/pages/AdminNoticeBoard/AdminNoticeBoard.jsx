import { TableCell, TableRow, Table } from "../../components/Table/Table";
import styles from "./NoticeBoard.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnnouncementModal from "./Modal/AnnouncementModal";
import AdminReportModal from "./Modal/ReportModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStore as FaqStore } from "../../stores/FAQStore/useStore";
import Dropdown from "../../components/Dropdown";
import { formattedDate } from "../../utils/formattedDate";
import Input from "../../components/Input";
import Button from "../../components/Button";


const headers = [
  "게시글 번호",
  "카테고리",
  "제목",
  "작성자",
  "작성일",
  "처리상태",
];

const PAGE_SIZE = 15; // 페이지당 데이터 수

const AdminNoticeBoard = () => {
  const { state: faqState, actions: faqActions } = FaqStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const [faqData, setFaqData] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // 드롭다운 선택값 및 입력 필드 값
  const [numberText, setNumberText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [faqNumber, setFaqNumber] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const categoryOptions = ["매너/제재", "건의/제보"];
  const monthOptions = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleClick = () => {
    setFaqNumber(numberText);
    setUserNickname(nicknameText);
  };

  // 데이터 로드
  useEffect(() => {
    axios.get("/data/faqData.json") // 적절한 경로로 변경
      .then(response => {
        setFaqData(response.data);
      });
  }, []);

  // 데이터 필터링 및 페이지네이션
  useEffect(() => {
    if (faqData.length > 0) {
      let filteredData = faqData;

      // 조건별 필터링
      if (faqNumber) {
        filteredData = filteredData.filter(data => data.faqNumber.toString() === numberText);
      }

      if (category) {
        filteredData = filteredData.filter(data => data.category === category);
      }

      if (selectedMonth) {
        const monthNumber = monthOptions.indexOf(selectedMonth) + 1; // 월 변환
        filteredData = filteredData.filter(data => new Date(data.date).getMonth() + 1 === monthNumber);
      }

    if(userNickname){
      filteredData = filteredData.filter(data => data.writeNickname === userNickname);
    }

      // 페이지에 맞게 데이터 슬라이싱
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = currentPage * PAGE_SIZE;
      const pageData = filteredData.slice(startIndex, endIndex);
      setCurrentDataList(pageData);

      // 총 페이지 수 계산
      const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
      setTotalPages(totalPages);
    }
  }, [faqData, category, selectedMonth, userNickname]);

  const handleClickItem = (id, category) => {
    navigate(`${id}?category=${category}`);
  };

  const handleWritePost = () => {
    navigate("/admin/notice-board/write");
  };

  return (
    <>
      <div className={styles["container"]}>
          <h2>게시글 관리</h2>
        <div>
          <Input
            size="xsmall"
            placeholder="게시글 번호"
            value={numberText}
            onChange={(e) => setNumberText(e.target.value)}
            gridArea="inp1"
          />
          <Input
            size="xsmall"
            placeholder="유저 닉네임"
            value={nicknameText}
            onChange={(e) => setNicknameText(e.target.value)}
            gridArea="inp2"
          />
          <Dropdown
            options={categoryOptions}
            selected={category}
            onChange={setCategory}
            text="카테고리"
            gridArea="inp3"
          />
          <Dropdown
            options={monthOptions}
            selected={selectedMonth}
            onChange={setSelectedMonth}
            text="작성월"
            gridArea="inp4"
          />
          <Button
          color="var(--main-color)"
          size="large"
          onClick={handleClick}
          gridArea="btn"
          >검색</Button>
          <Button
          color="var(--main-color)"
          onClick={handleWritePost}
          gridArea="btn2"
          size="large"
          >글 작성</Button>
        </div>
        <div className={styles["table-pagination-container"]}>
          <Table columCount={6} rowCount={15}>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} isHeader={true}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
            {currentDataList.map((data) => (
              <TableRow
                key={data.id}
                onClick={() => handleClickItem(data.id, data.category)}
              >
                <TableCell>{data.faqNumber}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.writeNickname}</TableCell>
                <TableCell>{formattedDate(data.date)}</TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
            ))}
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      {/* 모달 컴포넌트 */}
      {/* <AnnouncementModal /> */}
      {/* <AdminReportModal /> */}
      </div>
    </>
  );
};

export default AdminNoticeBoard;