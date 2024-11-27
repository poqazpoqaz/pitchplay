import { useState } from "react";
import "./Mypage1.module.css";
import Sidebar from "../../../containers/mypageSidebar/Sidebar";
import Top1 from './Top1';
import Top2 from './Top2';
import Bottom from './Bottom';
import { useStore } from '../../../stores/MypageStore/useStore';
import axios from 'axios';

const Mypage1 = ({ username, usercash }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { state, actions } = useStore();

    const formFields = [
        { label: "이름", name: "name", value: state.name },
        { label: "닉네임", name: "nickname", value: state.nickname },
        { label: "선호 지역", name: "region", value: state.region },
        { label: "선호 시간", name: "time", value: state.time },
        { label: "나의 팀", name: "team", value: state.team },
        { label: "소개하기", name: "intro", value: state.intro },
    ];

    // 이미지 변경 처리
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                setFileInput(file);
                setErrorMessage(""); // 에러 메시지 초기화
            } else {
                setErrorMessage("이미지 파일만 업로드 가능합니다.");
                setFileInput(null);
                event.target.value = null;
            }
        }
    };

    // 이미지 업로드 처리
    const handleFileUpload = async () => {
        if (fileInput) {
            const formData = new FormData();
            formData.append("profileImage", fileInput);

            try {
                // 경로는 그냥 예시입니다. 나중에 바꿔야함!
                const response = await axios.put(`/api/users/${username}/profile/image`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log(response.data.message);
                setErrorMessage("이미지 업로드 성공!");
            } catch (error) {
                setErrorMessage(error.response?.data?.message || "이미지 업로드 실패");
            }

            setFileInput(null);
        }
    };

    // 프로필 데이터 저장
    const saveProfileData = async (formData) => {
        try {
            const response = await axios.put(`/api/users/${username}/profile`, formData);
            console.log(response.data.message);
            setErrorMessage("프로필 저장 성공!");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "프로필 저장 실패");
        }
    };

    const toggleEdit = async () => {
        const newEditableState = !isEditable;
        setIsEditable(newEditableState);
        actions.toggleEditMode();

        if (!newEditableState) {
            await saveProfileData(state); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        actions.updateFormData(name, value);
    };

    return (
        <div className="mypage-grid">
            <div className="container">
                <div className="top">
                    <Top1
                        fileInput={fileInput}
                        errorMessage={errorMessage}
                        handleImageChange={handleImageChange}
                        handleFileUpload={handleFileUpload}
                    />
                    <Top2 username={username} usercash={usercash} />
                    <Bottom
                        formFields={formFields}
                        isEditable={isEditable}
                        handleInputChange={handleInputChange}
                        toggleEdit={toggleEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default Mypage1;
