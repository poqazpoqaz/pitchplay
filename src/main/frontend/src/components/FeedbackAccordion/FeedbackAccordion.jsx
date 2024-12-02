// FeedbackAccordion.js
import React, { useState, useEffect } from "react";
import ReportDetail from "./ReportDetail"; // 새로 만든 ReportDetail 컴포넌트 import
import "./FeedbackAccordion.css"; // CSS 파일 import

function FeedbackAccordion() {
  const [reports, setReports] = useState([]); // 신고 데이터를 관리하는 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고 상세 보기
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/faqData.json"); // JSON 파일 경로
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 신고 상세보기
  const handleViewReport = (faqNumber) => {
    const report = reports.find((report) => report.faqNumber === faqNumber);
    if (report) {
      setReports((prevReports) =>
        prevReports.map((r) =>
          r.faqNumber === faqNumber ? { ...r, views: r.views + 1 } : r
        )
      );
      setSelectedReport(report);
    }
  };

  // 댓글 작성
  const handleAddComment = () => {
    if (newComment.trim()) {
      setSelectedReport((prevReport) => ({
        ...prevReport,
        comments: [
          ...prevReport.comments,
          { userNickname: "User", comment: newComment },
        ],
      }));
      setNewComment("");
    }
  };

  // 댓글 수정 저장
  const handleSaveEditedComment = (index, editedText) => {
    const updatedComments = selectedReport.comments.map((comment, idx) =>
      idx === index
        ? { ...comment, comment: editedText }
        : comment
    );
    setSelectedReport({ ...selectedReport, comments: updatedComments });
  };

  // 댓글 삭제
  const handleDeleteComment = (index) => {
    const updatedComments = selectedReport.comments.filter(
      (_, idx) => idx !== index
    );
    setSelectedReport({ ...selectedReport, comments: updatedComments });
  };

  // 뒤로가기
  const handleGoBack = () => {
    setSelectedReport(null);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <div className="feedback-container">
      {selectedReport ? (
        <ReportDetail
          report={selectedReport}
          onGoBack={handleGoBack}
          onSaveEditedComment={handleSaveEditedComment}
          onEditComment={() => {}}
          onDeleteComment={handleDeleteComment}
        />
      ) : (
        <>
          <h2>건의 / 제보 게시판 리스트</h2>
          <table className="feedback-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>상태</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={report.faqNumber}
                  className="feedback-row"
                  onClick={() => handleViewReport(report.faqNumber)}
                >
                  <td>{index + 1}</td>
                  <td>{report.title}</td>
                  <td>{report.writeNickname}</td>
                  <td>{report.date}</td>
                  <td>{report.status}</td>
                  <td>{report.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default FeedbackAccordion;
