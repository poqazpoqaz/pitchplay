import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditorItem from "../EditorItem/EditorItem"; // EditorItem 컴포넌트 import
import "./WriteReport.css"; // CSS 파일 import

function WriteReport({ onCancel, onSubmit, gridArea }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // 이미지는 EditorItem에서 처리
  const [editorContent, setEditorContent] = useState(""); // 내용 상태 관리

  const quillRef = useRef(null); // Quill 인스턴스를 참조할 ref

  const navigate = useNavigate(); // useNavigate hook 사용

  // 제목, 카테고리 핸들러
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // 폼 제출 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 막기

    // onSubmit이 정의되지 않으면 기본 처리
    if (!onSubmit) {
      console.log("onSubmit 함수가 정의되지 않았습니다. 기본 동작 실행.");

      const newReport = {
        title,
        category,
        content: editorContent, // content는 EditorItem에서 관리
        image, // 이미지가 없어도 null로 처리됨
        date: new Date().toISOString().split("T")[0], // 날짜 형식 (YYYY-MM-DD)
      };

      // 기본 동작으로 콘솔에 데이터를 출력
      console.log("제출된 보고서 (기본 처리): ", newReport);

      alert("글을 등록하였습니다.");

      // 기본적으로 /notices/feedback으로 리다이렉트
      navigate("/notices/feedback");
      return;
    }

    // onSubmit이 정의되어 있으면 부모에서 전달된 함수 호출
    const newReport = {
      title,
      category,
      content: editorContent, // content는 EditorItem에서 관리
      image, // 이미지가 없어도 null로 처리됨
      date: new Date().toISOString().split("T")[0], // 날짜 형식 (YYYY-MM-DD)
    };

    console.log("제출된 보고서: ", newReport); // 제출된 내용 로그로 확인

    // 부모에서 전달된 onSubmit 함수 호출
    onSubmit(newReport);

    // 글쓰기 완료 후 알림 메시지 띄우고 /notices/feedback으로 리다이렉트
    alert("글을 등록하였습니다.");
    navigate("/notices/");
  };

  // 취소 버튼 클릭 시 /notice/feedback으로 리다이렉트
  const handleCancel = () => {
    navigate("/notices/");
  };

  return (
    <div className="write-report-container" style={{ gridArea }}>
      <h2>건의 / 제보 글쓰기</h2>
      <form className="write-report-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리</label>
          <select value={category} onChange={handleCategoryChange} required>
            <option value="">선택</option>
            <option value="건의">건의</option>
            <option value="제보">제보</option>
            <option value="매너">매너</option>
            <option value="제재">제재</option>
          </select>
        </div>

        {/* EditorItem 컴포넌트를 불러와서 내용과 이미지 업로드를 처리 */}
        <EditorItem setEditorContent={setEditorContent} quillRef={quillRef} />

        <div className="form-actions">
          <button type="submit">글쓰기</button>
          <button type="button1" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default WriteReport;
