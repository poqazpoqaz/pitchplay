import { useEffect, useState } from "react";
import styles from "./Mypage1.module.css";
import Top1 from './Top1';
import Top2 from './Top2';
import Bottom from './Bottom';
import { useStore } from "../../../stores/UserStore/useStore"
import axios from 'axios';
import { useParams } from "react-router-dom";

const Mypage1 = () => {
    const { id } = useParams();
    const [isEditable, setIsEditable] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const { state, actions } = useStore();

    // 해당하는 userid에 속하는 user 정보 설정 
    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const datas = response.data;
                const userData = datas.find(data => data.id === id);

                if (userData) {
                    actions.changeUserNumber(userData.userNumber);
                    actions.changeName(userData.name);
                    actions.changeNickname(userData.nickname);
                    actions.changeProfileImg(userData.profileImg);
                    actions.changeBirthday(userData.birthday);
                    actions.changeEmail(userData.email);
                    actions.changePhone(userData.phone);
                    actions.changeId(userData.id);
                    actions.changePassword(userData.password);
                    actions.changeFavoriteCity(userData.favoriteCity);
                    actions.changeUserCash(userData.userCash);
                    actions.changeFavoriteTime(userData.favoriteTime);
                    actions.changeMyTeam(userData.myTeam);
                    actions.changeMyDescription(userData.myDescription);
                }
            })
    }, [id])

    const formFields = [
        { label: "이름", name: "name", value: state.name, disabled: true },
        { label: "닉네임", name: "nickname", value: state.nickname, disabled: false },
        { label: "선호 지역", name: "region", value: state.favoriteCity, disabled: false },
        { label: "선호 시간", name: "time", value: state.favoriteTime, disabled: false },
        { label: "나의 팀", name: "team", value: state.myTeam, disabled: true },
        { label: "소개하기", name: "intro", value: state.myDescription, disabled: false },
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
                const response = await axios.put(`/api/users/${id}/profile/image`, formData, {
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
            const response = await axios.put(`/api/users/${id}/profile`, formData);
            console.log(response.data.message);
            setErrorMessage("프로필 저장 성공!");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "프로필 저장 실패");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // 'name'과 'team'은 변경 불가하므로 처리하지 않음
        if (name === "nickname") actions.changeNickname(value);
        else if (name === "region") actions.changeFavoriteCity(value);
        else if (name === "time") actions.changeFavoriteTime(value);
        else if (name === "intro") actions.changeMyDescription(value);

    };

    const toggleEdit = async () => {
        setIsEditable(!isEditable);

        if (!isEditable) {
            await saveProfileData(state);
        }
    };


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Top1
                        fileInput={fileInput}
                        errorMessage={errorMessage}
                        handleImageChange={handleImageChange}
                        handleFileUpload={handleFileUpload}
                    />
                    <Top2 username={state.name} usercash={state.userCash} />
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
