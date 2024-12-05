import { Table, TableCell, TableRow } from "../../components/Table/Table";
import styled from "styled-components";
import { useState, useEffect } from "react";
import DateRangeDropdown from "./DateRangeDropdown";
import axios from "axios";
import { formattedMMDD } from "../../utils/formattedDate";

const Wrapper = styled.div`
  display: grid;
  grid-template:
    'title ' 50px
    '...' 20px
    'calender' 20px
    '...' 20px
    'graph' 1fr / 1fr;
  border: 1px solid #A0A0A0;
  border-radius: 15px;
  padding: 20px;
`;

const Title = styled.h1`
  grid-area: title;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

`;

const Graph = styled.div`
  grid-area: graph;
`;

const DateSummaryCard = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");

  // 오늘 날짜를 포함하는 범위를 반환하는 함수
  const getTodayDate = () => {
    const today = new Date();
    return formattedMMDD(today);  // 오늘 날짜를 "MM-DD" 형식으로 반환
  };

  // 데이터 불러오기
  useEffect(() => {
    axios.get('/data/visitData.json')
      .then(response => {
        const data = response.data;
        if (data) {
          const { dailyVisitors } = data.visitorStatistics;
          setVisitorData(dailyVisitors);

          // 오늘 날짜에 해당하는 데이터만 필터링
          const today = getTodayDate();
          const filtered = dailyVisitors.filter(item => formattedMMDD(new Date(item.date)) === today);
          setFilteredData(filtered);  // 오늘 날짜 데이터만 필터링하여 설정
        }
      })
      .catch(error => console.error("데이터를 불러오는 데 실패했습니다.", error));
  }, []);

  // 날짜 범위 선택 시 필터링 함수
  const handleDateRangeSelect = (range) => {
    const [startDate, endDate] = range.split(" ~ ").map(date => new Date(date));
    const filtered = visitorData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filtered); // 선택된 범위로 데이터 필터링
  };

  return (
    <Wrapper>
      <Title>일자별 요약</Title>
      <div>
        <DateRangeDropdown onSelect={handleDateRangeSelect} gridArea="calender" selectedRange={selectedRange} />
      </div>
      <Graph>
        <Table columCount={6} rowCount={5} maxRowCount={5}>
          <TableRow>
            <TableCell isHeader={true}>일자</TableCell>
            <TableCell isHeader={true}>구장예약</TableCell>
            <TableCell isHeader={true}>매칭</TableCell>
            <TableCell isHeader={true}>FAQ</TableCell>
            <TableCell isHeader={true}>팀 생성</TableCell>
            <TableCell isHeader={true}>회원 가입</TableCell>
          </TableRow>
          {filteredData.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{formattedMMDD(item.date)}</TableCell>
              <TableCell>{item.stadiumReservations}건</TableCell>
              <TableCell>{item.matchings}건</TableCell>
              <TableCell>{item.faqSubmissions}건</TableCell>
              <TableCell>{item.teamCreations}팀</TableCell>
              <TableCell>{item.newRegistrations}명</TableCell>
            </TableRow>
          ))}
        </Table>
      </Graph>
    </Wrapper>
  );
};

export default DateSummaryCard;