import React, { useState } from "react";
import "./ReportDetail.css"; // CSS 파일 임포트

const ReportDetail = ({ report, onGoBack }) => {
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태
  const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글의 인덱스 상태
  const [editedCommentText, setEditedCommentText] = useState(""); // 수정된 댓글 내용

  // 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim()) { // 댓글이 비어 있지 않으면
      const newCommentObject = {
        userNickname: "백승우", // 예시로 하드코딩된 사용자명, 실제로는 로그인한 사용자로 대체 가능
        comment: newComment, // 작성된 댓글
      };
      report.comments.push(newCommentObject); // 댓글 배열에 새 댓글 추가
      setNewComment(""); // 댓글 입력창 초기화
    }
  };

  // 댓글 수정 시작 함수
  const handleEditComment = (index) => {
    setEditingComment(index); // 수정할 댓글의 인덱스 설정
    setEditedCommentText(report.comments[index].comment); // 기존 댓글 내용으로 수정 텍스트 초기화
  };

  // 수정된 댓글 저장 함수
  const handleSaveEditedComment = (index) => {
    report.comments[index].comment = editedCommentText; // 댓글 내용 수정
    setEditingComment(null); // 수정 상태 종료
    setEditedCommentText(""); // 수정된 텍스트 초기화
  };

  // 댓글 삭제 함수
  const handleDeleteComment = (index) => {
    report.comments.splice(index, 1); // 해당 댓글 삭제
  };

  return (
    <div className="report-detail">
      <h2>{report.title}</h2>
      <div className="report-info">
        <span><strong>작성자:</strong> {report.writeNickname}</span>
        <span><strong>사용자 ID:</strong> {report.userId}</span>
        <span><strong>날짜:</strong> {report.date}</span>
        <span><strong>상태:</strong> {report.status}</span>
        <span><strong>조회수:</strong> {report.views}</span>
      </div>
      <div className="report-content">
        <h3>내용</h3>
        <p>{report.content}</p>
      </div>
      <div className="comments-section">
        <h3>댓글</h3>
        {report.comments.length === 0 ? (
          <p>댓글이 없습니다.</p> // 댓글이 없으면 메시지 표시
        ) : (
          <ul>
            {report.comments.map((comment, index) => (
              <li key={index}>
                <p>
                  <strong>{comment.userNickname}</strong>:{" "}
                  {editingComment === index ? (
                    <>
                      <textarea
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                      />
                      <button onClick={() => handleSaveEditedComment(index)}>저장</button>
                    </>
                  ) : (
                    comment.comment // 수정 중이지 않으면 기존 댓글 내용 표시
                  )}
                </p>
                {editingComment !== index && (
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(index)}>수정</button>
                    <button onClick={() => handleDeleteComment(index)}>삭제</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요..."
        />
        <div className="comment-actions">
          <button className="add-comment-btn" onClick={handleAddComment}>댓글 달기</button>
          <button className="back-btn" onClick={onGoBack}>뒤로 가기</button> {/* 뒤로가기 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
