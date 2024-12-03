import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // navigate 훅 import
import "./ConductAccordion.css"; // CSS 파일 import
import ReportDetail from "../FeedbackAccordion/ReportDetail"; // 분리된 상세보기 컴포넌트 import

function ConductAccordion() {
  const [reports, setReports] = useState([]); // 신고 데이터를 관리하는 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고 상세 보기

  const navigate = useNavigate(); // useNavigate 훅 사용하여 navigate 함수 호출 가능

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/conductData.json"); // JSON 파일 경로
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

  // 뒤로가기
  const handleGoBack = () => {
    setSelectedReport(null);
  };

  // 댓글 추가 처리
  const handleAddComment = (newComment) => {
    setSelectedReport((prevReport) => ({
      ...prevReport,
      comments: [
        ...prevReport.comments,
        { userNickname: "User", comment: newComment },
      ],
    }));
  };

  // 댓글 수정 처리
  const handleSaveEditedComment = (index, editedCommentText) => {
    const updatedComments = selectedReport.comments.map((comment, idx) =>
      idx === index ? { ...comment, comment: editedCommentText } : comment
    );
    setSelectedReport({ ...selectedReport, comments: updatedComments });
  };

  // 댓글 삭제 처리
  const handleDeleteComment = (index) => {
    const updatedComments = selectedReport.comments.filter(
      (_, idx) => idx !== index
    );
    setSelectedReport({ ...selectedReport, comments: updatedComments });
  };

  // 글쓰기 페이지로 이동하는 함수
  const handleAddReport = () => {
    navigate("/write"); // 글쓰기 페이지로 이동
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
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      ) : (
        <>
          <h2>매너 / 제재 게시판 리스트</h2>
          <button className="add-report-btn" onClick={handleAddReport}>
            매너/제재 글쓰기
          </button>
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

export default ConductAccordion;
