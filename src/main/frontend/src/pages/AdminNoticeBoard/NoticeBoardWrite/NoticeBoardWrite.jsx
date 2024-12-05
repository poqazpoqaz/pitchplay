import { useNavigate } from "react-router-dom";
import EditorItem from "../../../components/EditorItem/EditorItem";
import React, { useRef, useState } from "react";
import Button from "../../../components/Button";
import styles from "./index.module.css";
import Dropdown from "../../../components/Dropdown";

const NoticeBoardWrite = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [category, setCategory] = useState("자주 하는 질문");

  const handleSave = () => {
    // 로컬 저장소에 데이터 저장
    localStorage.setItem("title", title);
    localStorage.setItem("editorContent", editorContent);
    
    navigate("/admin");
  };

  return (
    <div className={styles.container}>
      {!preview &&
      <div>
      <Dropdown
      text="카테고리"
      options={["공지사항", "자주묻는질문"]}
      selected={category}
      onChange={setCategory}
      />
      <div className={styles.header}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className={styles.titleInput}
        />
      </div>
      </div>  
      } 
      <div>
        {preview && (
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <p>{category}</p>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          </div>
        )}
        <div className={preview ? styles.hidden : styles.editor}>
          <EditorItem setEditorContent={setEditorContent} quillRef={quillRef} />
        </div>
      </div>
      <div className={styles.actions}>
        {preview && <Button onClick={() => setPreview(false)} color="var(--main-color)">수정하기</Button>}
        {!preview && <Button onClick={() => setPreview(true)} color="var(--main-color)">미리보기</Button>}
        <Button onClick={handleSave} color="var(--main-color)">
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default NoticeBoardWrite;
