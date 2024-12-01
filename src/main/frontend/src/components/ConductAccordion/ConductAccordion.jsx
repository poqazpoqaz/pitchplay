import React, { useState } from "react";
import "./ConductAccordion.css"; // CSS 파일 import

function ConductAccordion() {
  // 초기 신고 데이터
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "매너가 좋아요",
      reporter: "박상진",
      content: "승우 매너 짱짱맨",
      date: "2024-11-29",
      status: "처리 중",
      views: 22,
    },
    {
      id: 2,
      title: "매치 중 비매너 신고",
      reporter: "백승우",
      content: "박상진 비매너임",
      date: "2024-11-28",
      status: "처리 완료",
      views: 45268,
    },
  ]);

  // 신고 상세보기 기능
  const handleViewReport = (id) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? { ...report, views: report.views + 1 } // 조회수 증가
          : report
      )
    );
  };

  // 새 신고 추가
  const handleAddReport = () => {
    const newReport = {
      id: reports.length > 0 ? reports[reports.length - 1].id + 1 : 1,
      title: "새로운 신고 제목",
      reporter: "새 사용자",
      content: "새로운 신고 내용",
      date: new Date().toISOString().split("T")[0],
      status: "처리 중",
      views: 0,
    };

    setReports((prevReports) => [...prevReports, newReport]);
  };

  return (
    <div className="feedback-container">
      <h2>매너/제재 게시판 리스트</h2>
      <button className="add-report-btn" onClick={handleAddReport}>
        매너/제재 추가
      </button>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>내용</th>
            <th>날짜</th>
            <th>상태</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className="feedback-row"
              onClick={() => handleViewReport(report.id)}
            >
              <td>{index + 1}</td>
              <td>{report.title}</td>
              <td>{report.reporter}</td>
              <td>{report.content}</td>
              <td>{report.date}</td>
              <td>{report.status}</td>
              <td>{report.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConductAccordion;
