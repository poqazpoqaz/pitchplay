import AdminLabel from "../AdminLabel";
import CircleImg from "../CircleImg"
import TitleText from "../TitleText";
import styles from "./MiniProfile.module.css";


function MiniProfile({ index, src, isAdmin }) {
    return (
        <div className={styles['mini-grid']}>
            <div className={styles['mini-img']}>
                <CircleImg src={src} />
            </div>
            <div className={styles['mini-name']}>
                <TitleText color={"#000000"} size={"small"}>네임</TitleText>
                {isAdmin && <AdminLabel/>}
            </div>
            <div className={styles['mini-menu']}>
                <a href="#">
                    <p>●</p>
                    <p>●</p>
                    <p>●</p>
                </a>
            </div>
        </div>
    )
}

export default MiniProfile;