import { Outlet } from "react-router-dom";
import Sidebar from "../../../containers/mypageSidebar/Sidebar";
import styles from "./Mypage.module.css";
import { useEffect, useState } from "react";
import { useStore as UserStore } from "../../../stores/UserStore/useStore";
import axios from "axios";
import pachi from "./pachi.jpg";

function MyPage({ gridArea }) {
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 'userId' 가져오기
    const { state: userState, actions: userActions } = UserStore();

    const [profileImg, setProfileImg] = useState(userState.profileImg || pachi); // Base64로 저장된 이미지 상태

    // sidebar에 삽입할 userId의 정보 불러오기 
    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const datas = response.data;
                const userData = datas.find(data => data.id === user.id);

                if (userData) {
                    userActions.updateAllFields(userData);
                }
            });

        // 로컬스토리지에서 profileImg가 변경되었는지 체크하고 상태 업데이트
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.profileImg) {
            setProfileImg(savedUser.profileImg); // Base64 이미지 업데이트
        }
    }, [user.id]);
    
    return (
        <div className={styles['mypage-grid']} style={{ gridArea: gridArea }}>
            <Sidebar gridArea={"sidebar"} userState={userState} profileImg={profileImg} />
            <div className={styles['mypage-content']}>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage;