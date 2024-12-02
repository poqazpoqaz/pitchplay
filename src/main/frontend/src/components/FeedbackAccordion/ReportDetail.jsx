// ReportDetail.js
import React, { useState } from "react";
import "./ReportDetail.css"; // ReportDetail CSS import

function ReportDetail({ report, onGoBack, onSaveEditedComment, onEditComment, onDeleteComment }) {
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const handleEditComment = (index) => {
    setEditingComment(index);
    setEditedCommentText(report.comments[index].comment);
  };

  const handleSaveEditedComment = (index) => {
    onSaveEditedComment(index, editedCommentText);
    setEditingComment(null);
    setEditedCommentText("");
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
          <p>댓글이 없습니다.</p>
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
                    comment.comment
                  )}
                </p>
                {editingComment !== index && (
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(index)}>수정</button>
                    <button onClick={() => onDeleteComment(index)}>삭제</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        <button className="back-btn" onClick={onGoBack}>뒤로 가기</button>
      </div>
    </div>
  );
}

export default ReportDetail;
