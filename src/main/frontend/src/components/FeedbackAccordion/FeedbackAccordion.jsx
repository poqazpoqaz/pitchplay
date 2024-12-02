import React from "react";
import { Link } from "react-router-dom";
// import { useStore } from "../../stores/FAQStore/useStore";  // useStore 훅 임포트
import "./FeedbackAccordion.css";  // 스타일 import

function FeedbackAccordion() {
  const { state, actions } = useStore();  // useStore에서 상태와 액션 가져오기

  // 신고 상세보기 기능
  const handleViewReport = (id) => {
    actions.incrementViews(id);  // 조회수 증가 (액션 호출)
  };

  return (
    <div className="feedback-container">
      <h2>건의/제보 게시판 리스트</h2>
      {/* Link로 페이지 이동 */}
      <Link to="/write-report">
        <button className="add-report-btn">건의/제보 글쓰기</button>
      </Link>

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
          {/* posts 배열을 반복하며 게시물을 렌더링 */}
          {state.posts.map((report, index) => (
            <tr
              key={report.id}
              className="feedback-row"
              onClick={() => handleViewReport(report.id)}  // 클릭 시 조회수 증가
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

export default FeedbackAccordion;
