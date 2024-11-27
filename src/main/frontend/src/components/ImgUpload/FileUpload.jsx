import './TeamImg.css';

function FileUpload({image, setImage}) {
  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    
    if (file && file.type.startsWith("image/")) {
      previewImage(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      previewImage(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="file-upload-container"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="upload-box">
        {image ? (
          <img src={image} alt="미리보기" className="preview-image" />
        ) : (
          <p>이미지를 드래그하거나 클릭해주세요.</p>
        )}
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default FileUpload;
