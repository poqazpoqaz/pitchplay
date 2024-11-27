import React from 'react';
import pachiImage from './pachi.jpg';
import styled from 'styled-components';

// 스타일드 컴포넌트 정의
const Top1Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 8px;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const ChangeButton = styled.button`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #07550c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Top1 = ({ fileInput, errorMessage, handleImageChange, handleFileUpload }) => {
    return (
        <Top1Container>
            <ProfileImg src={pachiImage} alt="Profile" />
            <ChangeButton onClick={() => document.getElementById('profileImageInput').click()}>
                변경하기
            </ChangeButton>
            <FileInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profileImageInput"
            />
            {fileInput && (
                <div>
                    <UploadButton onClick={handleFileUpload}>이미지 변경</UploadButton>
                </div>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Top1Container>
    );
};

export default Top1;
