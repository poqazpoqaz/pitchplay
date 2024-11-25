import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Mypage1.css"; // CSS 파일을 불러옵니다.
import Sidebar from "./Sidebar"; // Sidebar 컴포넌트를 불러옵니다.
import pachiImage from './pachi.jpg'; // 임시 프로필 이미지

const Mypage1 = ({ username, usercash, profileData, changeProfileImage }) => {
    const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부
    const [fileInput, setFileInput] = useState(null); // 파일 상태
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [formData, setFormData] = useState({
        name: profileData?.name || "",
        nickname: profileData?.nickname || "",
        region: profileData?.region || "",
        time: profileData?.time || "",
        team: profileData?.team || "",
        intro: profileData?.intro || "",
    });// 수정된 값 상태

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                setFileInput(file);
                setErrorMessage(""); // 에러 메시지 초기화
            } else {
                alert("이미지 파일만 업로드 가능합니다.");
                setFileInput(null);
                event.target.value = null;
            }
        }
    };


    const handleFileUpload = () => {
        if (fileInput) {
            const reader = new FileReader();
            reader.onloadend = () => {
                changeProfileImage(reader.result);
            };
            reader.readAsDataURL(fileInput);
            setFileInput(null);
        }
    };

    // 수정 모드 토글 함수
    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
        if (isEditable) {
            // 수정 완료 시, 변경된 값을 처리합니다.
            console.log(formData); // 수정된 데이터는 formData에 담겨있습니다.
        }
    };

    // 폼 데이터 업데이트 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="mypage-grid">
            <Header />
            <div className="container">
                <Sidebar />

                <div className="top">
                    <div className="top1">
                        <img className="profileimg" src={pachiImage} alt="Profile" />
                        <button className="change-button" onClick={() => document.getElementById('profileImageInput').click()}>
                            변경하기
                        </button>
                        {/* 파일 선택 input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="profileImageInput"
                        />
                        {fileInput && (
                            <div>
                                <button onClick={handleFileUpload}>이미지 변경</button>
                            </div>
                        )}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                    <div className="top2">
                        <h2>{username} : 님</h2>
                        <p>잔액 : {usercash} 원</p>
                        <ul>
                            <li><a href="/charge" className="link-button">충전하기</a></li>
                            <li><a href="/refund" className="link-button">환불하기</a></li>
                            <li><a href="/history" className="link-button">사용내역</a></li>
                        </ul>
                    </div>

                    <div className="bottom">
                        <h1>마이페이지 &gt; 내정보</h1>
                        <ul>
                            <li>
                                <label>이름</label>
                                <input
                                    type="text"
                                    name="name"
                                    // value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="이름을 입력하세요"
                                />
                            </li>
                            <li>
                                <label>닉네임</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    // value={formData.nickname}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="닉네임을 입력하세요"
                                />
                            </li>
                            <li>
                                <label>선호 지역</label>
                                <input
                                    type="text"
                                    name="region"
                                    // value={formData.region}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="선호 지역을 입력하세요"
                                />
                            </li>
                            <li>
                                <label>선호 시간</label>
                                <input
                                    type="text"
                                    name="time"
                                    // value={formData.time}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="선호 시간을 입력하세요"
                                />
                            </li>
                            <li>
                                <label>나의 팀</label>
                                <input
                                    type="text"
                                    name="team"
                                    // value={formData.team}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="나의 팀을 입력하세요"
                                />
                            </li>
                            <li className="textarea">
                                <label>소개하기</label>
                                <input
                                    type="text"
                                    name="intro"
                                    // value={formData.intro}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    placeholder="자신을 소개하세요"
                                />
                            </li>
                        </ul>
                        <button onClick={toggleEdit}>
                            {isEditable ? '수정 완료' : '프로필 수정'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Mypage1;
