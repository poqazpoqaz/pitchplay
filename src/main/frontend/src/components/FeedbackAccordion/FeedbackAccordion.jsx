import React, { useState } from "react";
import "./FeedbackAccordion.css";
import { useStore } from "../../stores/FAQStore/useStore"; // useStore 훅을 가져옵니다.

function FeedbackAccordion() {
  const { state, actions } = useStore(); // 상태와 액션을 받아옵니다.
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글 ID
  const [editedCommentText, setEditedCommentText] = useState(""); // 수정된 댓글 텍스트

  // state.reports가 정의되어 있는지 확인
  const reports = state.reports || []; // reports가 없을 경우 빈 배열을 사용

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
      comments: [],
    };
    actions.addReport(newReport); // 리듀서의 addReport 액션 호출
  };

  // 리포트 보기
  const handleViewReport = (id) => {
    setSelectedReportId(id);
  };

  // 뒤로가기
  const handleGoBack = () => {
    setSelectedReportId(null);
  };

  // 댓글 추가
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Math.random(), // 임의의 고유 ID (실제 코드에서는 고유한 ID 생성 방식 사용)
        text: newComment,
        author: "백승우",
        replies: [], // 대댓글 목록 초기화
      };
      actions.addComment(selectedReportId, comment); // 리포트에 댓글 추가
      setNewComment(""); // 댓글 입력 후 입력창 비우기
    }
  };

  // 댓글 수정
  const handleEditComment = (commentId, newText) => {
    actions.updateComment(selectedReportId, commentId, { text: newText });
    setEditCommentId(null); // 수정 모드 종료
    setEditedCommentText(""); // 수정된 텍스트 초기화
  };

  // 댓글 수정 시작
  const handleStartEditComment = (commentId, currentText) => {
    setEditCommentId(commentId);
    setEditedCommentText(currentText); // 수정할 댓글의 기존 텍스트 설정
  };

  // 댓글 삭제
  const handleDeleteComment = (reportId, commentId) => {
    actions.deleteComment(reportId, commentId); // 댓글 삭제
  };

  // 선택된 리포트 찾기
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
                      <p><strong>{comment.author}</strong>: {comment.text}</p>
                      <button
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(selectedReport.id, comment.id)}
                      >
                        삭제
                      </button>
                      <button
                        className="edit-comment-btn"
                        onClick={() => handleStartEditComment(comment.id, comment.text)}
                      >
                        수정
                      </button>
                      {editCommentId === comment.id ? (
                        <div>
                          <textarea
                            value={editedCommentText}
                            onChange={(e) => setEditedCommentText(e.target.value)}
                          />
                          <button
                            className="save-edit-btn"
                            onClick={() => handleEditComment(comment.id, editedCommentText)}
                          >
                            저장
                          </button>
                        </div>
                      ) : null}
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
          {/* 상세 페이지가 아닐 때만 "새 신고 추가" 버튼 보이게 하기 */}
      {selectedReportId === null && (
        <button className="add-report-btn" onClick={handleAddReport}>
          새 신고 추가
        </button>
      )}
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
