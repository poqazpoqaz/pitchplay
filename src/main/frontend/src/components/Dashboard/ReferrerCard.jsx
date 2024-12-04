import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Dropdown from "../Dropdown";
import axios from "axios";
import styled from "styled-components";


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


const ReferrerCard = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth).padStart(2, '0'));
  const [visitorData, setVisitorData] = useState(null);
  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];  // 숫자만 표시

  // 월별 데이터 집계 함수
  const aggregateDataByMonth = (dailyVisitors) => {
    const monthlyData = {};

    dailyVisitors.forEach((item) => {
      const month = item.date.slice(5, 7); // "MM" 형태로 월을 추출
      if (!monthlyData[month]) {
        monthlyData[month] = { name: month, naver: 0, google: 0, safari: 0, other: 0 }; // 초기화
      }

      // 방문 경로별로 합산
      monthlyData[month].naver += item.naver;
      monthlyData[month].google += item.google;
      monthlyData[month].safari += item.safari;
      monthlyData[month].other += item.other;
    });

    return monthlyData;
  };

  // 데이터 불러오기
  useEffect(() => {
    axios.get('/data/visitData.json')
      .then(response => {
        const data = response.data;
        if (data) {
          const { dailyVisitors } = data.visitorStatistics;
          const aggregatedData = aggregateDataByMonth(dailyVisitors);
          setVisitorData(aggregatedData);
        }
      })
      .catch(error => console.error("데이터를 불러오는 데 실패했습니다.", error));
  }, []);

  // 드롭다운에서 월을 선택했을 때 처리
  const handleMonthChange = (selectedValue) => {
    setSelectedMonth(selectedValue);
  };

  return (
    <Wrapper>
      <Title>유입 경로</Title>

      <Dropdown
        options={options}
        selected={selectedMonth}
        onChange={handleMonthChange}
        text="월 선택"
        gridArea="drop"
      />


      {/* 차트 */}
      <Graph>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={visitorData ? [visitorData[selectedMonth]] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="naver" fill="#00C853" name="네이버" />
            <Bar dataKey="google" fill="#4285F4" name="구글" />
            <Bar dataKey="safari" fill="#FF9800" name="사파리" />
            <Bar dataKey="other" fill="#9E9E9E" name="기타" />
          </BarChart>
        </ResponsiveContainer>
      </Graph>
    </Wrapper>
  );
};

export default ReferrerCard;