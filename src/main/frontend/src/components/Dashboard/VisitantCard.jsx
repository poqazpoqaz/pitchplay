import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import Dropdown from "../Dropdown";

const Wrapper = styled.div`
display: grid;
grid-template: 
'title ... drop' 50px
'... ... ...' 20px
'graph graph graph' 1fr /3fr 1fr 1fr ;
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
`

const Graph = styled.div`
grid-area: graph;
`


const VisitantCard = () => {
  const [data, setVisitorData] = useState([]);
  const [viewType, setViewType] = useState("년");

  // useEffect를 이용한 데이터 불러오기
  useEffect(() => {
    axios.get('/data/visitData.json')
      .then(response => {
        const data = response.data;
        if (data) {
          setVisitorData(data);
        }
      })
      .catch(error => console.error("데이터를 불러오는 데 실패했습니다.", error));
  }, []); // 컴포넌트가 처음 렌더링 될 때 한 번만 실행


  // 데이터를 필터링하는 함수
  const filterData = () => {
    const { yearlyVisitors, monthlyVisitors, dailyVisitors } = data.visitorStatistics;

    if (viewType === "년") {
      return yearlyVisitors; // 년도별 데이터 반환
    }

    if (viewType === "월") {
      return monthlyVisitors; // 월별 데이터 반환
    }
    if (viewType === "일") {
      return dailyVisitors; // 일자별 데이터 반환
    }
  };

  if (!data || !data.visitorStatistics) {
    return <div>Loading...</div>; // 데이터가 아직 로드되지 않았을 때 로딩 표시
  }

  const chartData = filterData(); // 필터링된 데이터


  // 날짜 형식 변경 함수
  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}-${newDate.getDate()}`; // 월-일 형식
  };

  return (
    <Wrapper>
      <Title>방문자 현황</Title>
      <Dropdown
        options={["년", "월", "일"]}
        selected={viewType}
        onChange={setViewType}
        text="단위 선택 "
        gridArea="drop" />
      <Graph>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={viewType === "년" ? "year" : "date"}
              interval={viewType === "일" ? 6 : 0} // 일별 데이터의 경우 라벨 간격을 6일로 설정
              tickFormatter={viewType === "일" ? formatDate : undefined} // 일별 데이터 MM-DD로
              textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalVisitors" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Graph>
    </Wrapper>
  );
};

export default VisitantCard;