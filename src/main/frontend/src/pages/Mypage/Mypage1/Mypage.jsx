import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../../containers/mypageSidebar/Sidebar";
import styles from "./Mypage.module.css";
import { useEffect } from "react";
import { useStore as UserStore} from "../../../stores/UserStore/useStore";
import axios from "axios";

function MyPage({ gridArea }) {
    const { id } = useParams();
    const { state: userState, actions: userActions} = UserStore();

    // sidebar에 삽입할 userId의 정보 불러오기 
    useEffect(() => {
        axios.get("/data/userData.json")
        .then(response => {
            const datas = response.data;
            const userData = datas.find(data => data.id === id);

            if (userData) {
                userActions.changeName(userData.name);
                userActions.changeProfileImg(userData.profileImg);
                userActions.changeEmail(userData.email);
            }
        })
    }, [id])

    return (
        <div className={styles['mypage-grid']} style={{ gridArea: gridArea }}>
            <Sidebar gridArea={"sidebar"} userState={userState} />
            <div className={styles['mypage-content']}>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage;