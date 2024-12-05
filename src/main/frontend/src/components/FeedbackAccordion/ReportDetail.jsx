import React, { useState } from "react";
import "./ReportDetail.css"; // CSS 파일 임포트

const ReportDetail = ({ report, onGoBack, faqState, faqActions }) => {
  const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'user' 가져오기

  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태
  const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글의 인덱스 상태
  const [editedCommentText, setEditedCommentText] = useState(""); // 수정된 댓글 내용

   // 댓글 추가 함수
   const handleAddComment = () => {
    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다."); // 로그인하지 않은 사용자에 대한 알림
      return;
    }

    if (newComment.trim()) { // 댓글이 비어 있지 않으면
      const newCommentObject = {
        userNickname: user.nickname,
        comment: newComment, // 작성된 댓글
      };
      // 현재 comments 배열에 새 댓글을 추가
      const updatedComments = [...faqState.comments, newCommentObject];

      // 댓글 배열을 상태에 반영
      faqActions.changeComment(updatedComments);
      setNewComment(""); // 댓글 입력창 초기화
    }
  };

  // 댓글 수정 시작 함수 (로그인한 유저의 닉네임과 동일할 경우에만 수정)
  const handleEditComment = (index) => {
    if (!user) {
      alert("로그인 후 댓글을 수정할 수 있습니다."); // 로그인하지 않은 사용자에 대한 알림
      return;
    }

    if (faqState.comments[index].userNickname === user.nickname) {
      setEditingComment(index); // 수정할 댓글의 인덱스 설정
      setEditedCommentText(faqState.comments[index].comment); // 기존 댓글 내용으로 수정 텍스트 초기화
    } else {
      alert("본인의 댓글만 수정할 수 있습니다."); // 댓글 작성자가 아닐 때 경고
    }
  };

  // 수정된 댓글 저장
  const handleSaveEditedComment = (index) => {
    const updatedCommnet = {
      userNickname: faqState.comments[index].userNickname,
      comment: editedCommentText
    }

    const updatedComments = faqState.comments.map((comment, i) => i === index ? updatedCommnet : comment);
    faqActions.changeComment(updatedComments);

    setEditingComment(null); // 수정 상태 종료
    setEditedCommentText(""); // 수정된 텍스트 초기화
  }

  // 댓글 삭제 함수
  const handleDeleteComment = (index) => {
    if (!user) {
      alert("로그인 후 댓글을 삭제할 수 있습니다."); // 로그인하지 않은 사용자에 대한 알림
      return;
    }

    if (faqState.comments[index].userNickname === user.nickname) {
      const updatedComments = faqState.comments.filter((_, i) => i !== index);
      faqActions.changeComment(updatedComments);
    } else {
      alert("본인의 댓글만 삭제할 수 있습니다."); // 댓글 작성자가 아닐 때 경고
    }
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
        {faqState.comments.length === 0 ? (
          <p>댓글이 없습니다.</p> // 댓글이 없으면 메시지 표시
        ) : (
          <ul>
            {faqState.comments.map((comment, index) => (
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
                {user && comment.userNickname === user.nickname && editingComment !== index && (
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