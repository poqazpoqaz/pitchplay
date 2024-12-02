import React, { useState } from "react";
import "./FeedbackAccordion.css";

function FeedbackAccordion() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "서비스 개선 요청",
      reporter: "백승우",
      content: "앱의 UI/UX가 불편해서 사용하기 힘들어요.",
      date: "2024-11-29",
      status: "처리 중",
      views: 123,
      comments: [],  
    },
    {
      id: 2,
      title: "매칭 시스템 버그",
      reporter: "박상진",
      content: "매칭된 팀과의 연결이 제대로 이루어지지 않습니다. 시스템 점검이 필요합니다.",
      date: "2024-11-28",
      status: "처리 완료",
      views: 3500,
      comments: [],
    },
    {
      id: 3,
      title: "서버 오류 발생",
      reporter: "백승우",
      content: "경기 중 서버가 자주 끊겨서 게임을 진행할 수 없습니다. 개선이 필요합니다.",
      date: "2024-11-27",
      status: "처리 중",
      views: 290,
      comments: [],
    },
    {
      id: 4,
      title: "결제 시스템 오류",
      reporter: "백승우",
      content: "결제 과정에서 오류가 발생하여 상품을 구매할 수 없습니다. 빠르게 수정해주세요.",
      date: "2024-11-26",
      status: "처리 완료",
      views: 500,
      comments: [],
    },
    {
      id: 5,
      title: "회원가입 문제",
      reporter: "백승우",
      content: "회원가입 시 이메일 인증이 되지 않습니다. 문제를 해결해주세요.",
      date: "2024-11-25",
      status: "처리 중",
      views: 110,
      comments: [],
    },
    {
      id: 6,
      title: "비매너 사용자 신고",
      reporter: "백승우",
      content: "게임 중 비매너적인 행동을 한 사용자에 대해 신고합니다. 제재 부탁드립니다.",
      date: "2024-11-24",
      status: "처리 완료",
      views: 1120,
      comments: [],
    },
    {
      id: 7,
      title: "앱 반응속도 개선 요청",
      reporter: "박상진",
      content: "앱의 반응 속도가 너무 느려서 불편합니다. 속도 개선이 필요합니다.",
      date: "2024-11-23",
      status: "처리 중",
      views: 204,
      comments: [],
    },
    {
      id: 8,
      title: "정책 변경에 대한 건의",
      reporter: "박상진",
      content: "최근 정책 변경에 대해 불만이 많습니다. 개선할 점을 제안합니다.",
      date: "2024-11-22",
      status: "처리 완료",
      views: 540,
      comments: [],
    },
    {
      id: 9,
      title: "결제 오류 해결 요청",
      reporter: "백승우",
      content: "상품 결제 시 결제 오류가 발생하고 있습니다. 확인 부탁드립니다.",
      date: "2024-11-21",
      status: "처리 중",
      views: 310,
      comments: [],
    },
    {
      id: 10,
      title: "이벤트 참여 문제",
      reporter: "박상진",
      content: "이벤트에 참여했으나 보상 지급이 되지 않았습니다. 확인 후 처리 바랍니다.",
      date: "2024-11-20",
      status: "처리 완료",
      views: 450,
      comments: [],
    }
  ]);

  const [selectedReportId, setSelectedReportId] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleViewReport = (id) => {
    setSelectedReportId(id);
  };

  const handleGoBack = () => {
    setSelectedReportId(null);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedReports = reports.map((report) =>
        report.id === selectedReportId
          ? {
              ...report,
              comments: [
                ...report.comments,
                {
                  id: report.comments.length + 1,
                  text: newComment,
                  author: "백승우", // 댓글 작성자의 닉네임 추가
                },
              ],
            }
          : report
      );
      setReports(updatedReports);
      setNewComment(""); // 댓글 작성 후 입력창 비우기
    }
  };

  const handleDeleteComment = (reportId, commentId) => {
    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? {
            ...report,
            comments: report.comments.filter((comment) => comment.id !== commentId),
          }
        : report
    );
    setReports(updatedReports);
  };

  const selectedReport = reports.find((report) => report.id === selectedReportId);

  return (
    <div className="feedback-container">
      {selectedReport ? (
        <div className="report-detail">
          <div className="report-detail-content">
            <h2>{selectedReport.title}</h2>
            <div className="detail-info">
              <p><strong>작성자:</strong> {selectedReport.reporter}</p>
              <p><strong>날짜:</strong> {selectedReport.date}</p>
              <p><strong>상태:</strong> {selectedReport.status}</p>
              <p><strong>조회수:</strong> {selectedReport.views}</p>
            </div>
            <div className="detail-content">
              <h3>내용</h3>
              <p>{selectedReport.content}</p>
            </div>
            <div className="comments-section">
              <br />
              {selectedReport.comments.length === 0 ? (
                <p>댓글이 없습니다.</p>
              ) : (
                <ul>
                  {selectedReport.comments.map((comment) => (
                    <li key={comment.id} className="comment">
                      <p><strong>{comment.author}</strong>: {comment.text}</p> {/* 작성자 추가 */}
                      <button
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(selectedReport.id, comment.id)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
              />
              <div className="comment-actions">
                <button className="add-comment-btn" onClick={handleAddComment}>
                  댓글 달기
                </button>
                <button className="back-btn" onClick={handleGoBack}>
                  뒤로 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2>건의/제보 게시판 리스트</h2>
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
                <tr key={report.id} onClick={() => handleViewReport(report.id)}>
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
        </>
      )}
    </div>
  );
}

export default FeedbackAccordion;
