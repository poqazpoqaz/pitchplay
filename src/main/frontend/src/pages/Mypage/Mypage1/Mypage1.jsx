import { useEffect, useState } from "react";
import styles from "./Mypage1.module.css";
import Top1 from './Top1';
import Top2 from './Top2';
import Bottom from './Bottom';
import { useStore } from "../../../stores/UserStore/useStore";
import pachi from "./pachi.jpg"
import axios from "axios";

const Mypage1 = () => {
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'userId' 가져오기
    const [isEditable, setIsEditable] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [profileImg, setProfileImg] = useState(null);

    const { state, actions } = useStore();

    // 해당하는 userid에 속하는 user 정보 설정 
    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const datas = response.data;
                const userData = datas.find(data => data.id === user.id);

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

        // 로컬스토리지에서 profileImg가 있으면 불러오기
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser && savedUser.profileImg) {
            actions.changeProfileImg(savedUser.profileImg); // store 업데이트
            setProfileImg(savedUser.profileImg); // base64 파일 가져오기
            setPreviewImage(savedUser.profileImg); // 미리보기 업데이트
        }
    }, [user.id]);

    const formFields = [
        { label: "이름", name: "name", value: state.name, disabled: true },
        { label: "닉네임", name: "nickname", value: state.nickname, disabled: false },
        { label: "선호 지역", name: "region", value: state.favoriteCity, disabled: false },
        { label: "선호 시간", name: "time", value: state.favoriteTime, disabled: false },
        { label: "나의 팀", name: "team", value: state.myTeam, disabled: true },
        { label: "소개하기", name: "intro", value: state.myDescription, disabled: false },
    ];

    // 이미지 변경 처리 (Base64로 변환)
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                // 이미지 파일을 Base64로 변환
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result;
                    setFileInput(base64Image); // Base64 이미지 상태에 저장
                    setPreviewImage(base64Image); // 미리보기 이미지 상태에 저장
                    setErrorMessage("");
                };
                reader.readAsDataURL(file);
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
            // localStorage에서 user 정보 가져오기
            const user = JSON.parse(localStorage.getItem("user"));

            // Base64 이미지를 localStorage에 저장
            user.profileImg = fileInput; // Base64 이미지 저장

            // 업데이트된 user 정보를 다시 localStorage에 저장
            localStorage.setItem("user", JSON.stringify(user));

            // 상태 업데이트 (미리보기와 이미지 상태 바로 반영)
            setProfileImg(fileInput); // profileImg 상태 업데이트
            setPreviewImage(fileInput); // previewImage 상태 업데이트
            actions.changeProfileImg(fileInput); // store에도 업데이트

            setErrorMessage("이미지 업로드 성공!");
            setFileInput(null);
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

        // 편집 상태가 끝나면 userState를 로컬스토리지에 저장
        if (!isEditable) {
            // 전체 상태 저장
            localStorage.setItem("user", JSON.stringify(state));
        };
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Top1
                        profileImg={profileImg || pachi}
                        fileInput={fileInput}
                        errorMessage={errorMessage}
                        handleImageChange={handleImageChange}
                        handleFileUpload={handleFileUpload}
                        previewImage={previewImage} //미리보기 전달
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